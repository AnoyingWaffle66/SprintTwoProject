import Link from "next/link";
import coursesData from "./data/courses.json";

export default function Home() {
  const courses = Object.values(coursesData);

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.route}>
            <Link href={`/${encodeURIComponent(course.route.split('/').pop())}`}>
              {course.course_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}