from clear_course import ClearCourse
import requests as req
from bs4 import BeautifulSoup as bs

tester = ClearCourse("test/href")
tester.add_requisite(ClearCourse("pre/requisite"))
tester.add_requisite(ClearCourse("pre/requisite-2"))
tester.add_requisite(ClearCourse("pre-for/requisite"), "pre-for")
tester.add_requisite(ClearCourse("pre-for/requisite-2"), "pre-for")
tester.add_requisite(ClearCourse("pre-for/requisite-3"), "pre-for")
tester.add_requisite(ClearCourse("co/requisite"), "co")

print(tester)

request = req.get("https://neumont.smartcatalogiq.com/en/2024-2025/2024-2025/course-descriptions/csc-computer-science/200/csc260")

soup = bs(request.text, 'html.parser')

h1 = soup.find(id="main").find('h1')

print(h1.contents[2].text.strip())

