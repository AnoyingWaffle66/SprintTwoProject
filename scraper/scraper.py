from clear_course import ClearCourse
import requests as req
from bs4 import BeautifulSoup as bs
from bs4 import Tag, ResultSet


ALL_CATALOG_THINGIES = [
    "/bachelor-of-science-in-computer-science/",
    "/applied-artificial-intelligence-and-data-engineering/",
    "/artificial-intelligence-engineering/",
    "/information-systems-and-cybersecurity/",
    # "/bachelor-of-science-in-software-and-game-development/",
    # "/software-engineering/",
    # "/associates-of-science-in-software-development/"
]

CS_CATALOG_BASE_URL = "https://neumont.smartcatalogiq.com/en/2024-2025/2024-2025/undergraduate-programs/undergraduate-program-overview"

INDIVIDUAL_COURSE_BASE_URL = "https://neumont.smartcatalogiq.com"

course_hrefs: set[str] = set()
for route in ALL_CATALOG_THINGIES:
    request = req.get(f"{CS_CATALOG_BASE_URL}{route}")
    html = request.text

    soup = bs(html, 'html.parser')

    tables: ResultSet[Tag] = soup.find_all("table")

    # print(tables)

    for table in tables:
        thingy: ResultSet[Tag] = table.find_all(class_="sc-coursenumber")
        if not thingy:
            continue
        for thing in thingy:
            course_hrefs.add(thing.find(class_="sc-courselink")['href'])
    print(len(course_hrefs))

course_hrefs = sorted(list(course_hrefs))

# soupy = bs(req.get(f"https://neumont.smartcatalogiq.com{course_hrefs[0]}").text, "html.parser")

courses = [ClearCourse(course) for course in course_hrefs]

for course in courses[0:1]:
    request = req.get(f"{INDIVIDUAL_COURSE_BASE_URL}{course.href}")
    course.set_scraped()
    soup = bs(request.text, 'html.parser')
    print(soup.prettify())

# for course in courses:
#     print(course)
