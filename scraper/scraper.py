from clear_course import ClearCourse
import requests as req
from bs4 import BeautifulSoup as bs
from bs4 import Tag, ResultSet

#region constants
PARSER = 'html.parser'
CS_CATALOG_BASE_URL = "https://neumont.smartcatalogiq.com/en/2024-2025/2024-2025/undergraduate-programs/undergraduate-program-overview"
INDIVIDUAL_COURSE_BASE_URL = "https://neumont.smartcatalogiq.com"

ALL_CATALOG_ROUTES = [ # minimum number to get all courses
    "/bachelor-of-science-in-computer-science/",
    "/applied-artificial-intelligence-and-data-engineering/",
    "/artificial-intelligence-engineering/",
    "/information-systems-and-cybersecurity/",
    # "/bachelor-of-science-in-software-and-game-development/",
    # "/software-engineering/",
    # "/associates-of-science-in-software-development/"
]
#endregion

course_routes: set[str] = set()
for route in ALL_CATALOG_ROUTES:
    request = req.get(f"{CS_CATALOG_BASE_URL}{route}")
    degree_html = request.text
    
    soup = bs(degree_html, PARSER)
    
    course_codes: ResultSet[Tag] = soup.find_all(class_="sc-courselink")
    
    for course_code in course_codes:
        course_routes.add(course_code['href'])
    
    print(len(course_routes))

course_routes = sorted(list(course_routes))

courses = [ClearCourse(course) for course in course_routes]

def find_requisite_instance(course: ClearCourse, course_href, which_req_type):
    global courses
    for c in courses:
        if c.route != course_href:
            continue
        course.add_requisite(c, which_req_type)
        break

def scrape_requisites(soup: bs, which_class: str, which_req_type: str):
    requisites: Tag = soup.find(class_=which_class)
    requisite_routes = requisites.find_all("a")
    for route in requisite_routes:
        find_requisite_instance(course, route["href"], which_req_type)


for course in courses:
    request = req.get(f"{INDIVIDUAL_COURSE_BASE_URL}{course.route}")
    course.set_scraped()
    course_html = request.text
    soup = bs(course_html, PARSER)
    scrape_requisites(soup, "sc_prereqs", "pre")
    scrape_requisites(soup, "sc_coreqs", "co")

# for course in courses[0:10]:
#     print(course)
# for course in course_routes:
#     print(course)
