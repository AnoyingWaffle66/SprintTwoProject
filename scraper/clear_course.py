from __future__ import annotations

class ClearCourse:
    def __init__(self, href: str, course_name: str = ""):
        self.href_scraped = False
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

    def set_scraped(self):
        self.href_scraped = True

    def add_requisite(self, course_to_add: ClearCourse, _which_list = "pre") -> None:
        self._requisite_lists[_which_list].add(course_to_add)

    def __iter__(self):
        yield "href", self.href
        yield "course_name", self.course_name
        # Convert requisite sets into lists of hrefs for serialization
        yield "requisites", {
            k: [c.href for c in v] for k, v in self._requisite_lists.items()
        }


    def __str__(self) -> str:
        this_string = str()
        this_string += f"this href - {self.href}\n"
        for key, value in self._requisite_lists.items():
            this_string += f"{key}: [\n"
            for v in sorted(list(value), key=lambda c: c.href):
                this_string += f"\tcourse name - {v.course_name}\n"
                this_string += f"\thref - {v.href}\n"
            this_string += "]\n\n"
        return this_string
