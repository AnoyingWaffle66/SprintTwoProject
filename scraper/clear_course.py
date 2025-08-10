from __future__ import annotations

class ClearCourse:
    def __init__(self, href: str, course_name: str = ""):
        self.href: str = href
        self.course_name: str = course_name
        self.co_reqs: set[ClearCourse] = set()
        self.pre_reqs: set[ClearCourse] = set()
        self.pre_reqs_for: set[ClearCourse] = set()
        self._requisite_lists: dict[str, set[ClearCourse]] = {
            "pre"     : self.pre_reqs,
            "pre-for" : self.pre_reqs_for,
            "co"      : self.co_reqs
        }
    
    def add_requisite(self, course_to_add: ClearCourse, _which_list = "pre") -> None:
        self._requisite_lists[_which_list].add(course_to_add)

    def __str__(self) -> str:
        this_string = str()
        this_string += "Co requisite classes:\n"
        for co_req in self._requisite_lists["co"]:
            this_string += f"\t{co_req.course_name}\n"

        this_string += "Pre requisite classes:\n"
        for pre_req in self._requisite_lists["pre"]:
            this_string += f"\t{pre_req.course_name}\n"

        this_string += "Pre requisite for classes:\n"
        for pre_req_for in self._requisite_lists["pre-for"]:
            this_string += f"\t{pre_req_for.course_name}\n"
        
        return this_string
