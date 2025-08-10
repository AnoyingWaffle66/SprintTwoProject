from bs4 import BeautifulSoup as bs
from bs4 import Tag, ResultSet
import requests as req

CS_CATALOG_URL = "https://neumont.smartcatalogiq.com/en/2024-2025/2024-2025/undergraduate-programs/undergraduate-program-overview/bachelor-of-science-in-computer-science/"

request = req.get(CS_CATALOG_URL)
html = request.text

soup = bs(html, 'html.parser')

tables: ResultSet[Tag] = soup.find_all("table")

print(tables)

course_hrefs_by_code: list[str] = list()
for table in tables:
    thingy: ResultSet[Tag] = table.find_all(class_="sc-coursenumber")
    if not thingy:
        continue
    for thing in thingy:
        course_hrefs_by_code.append(thing.find(class_="sc-courselink")['href'])

print(course_hrefs_by_code)