import Link from "next/link";
import coursesData from "./public/Data/courses.json";
import './globals.css'

export default function Home() {
  const courses = Object.values(coursesData);

  return (
    <div>
      <h1>Courses</h1>
      <flex class="course_table">
         <table>
            {courses.map(course => (
               <tr class={course.course_code.substring(0, 3)} key={course.route}>
                  <td class="course"><Link href={`/${encodeURIComponent(course.route.split('/').pop())}`}>
                        {course.course_name}
                        </Link></td>
                  <td>{course.course_code}</td>
               </tr>
            ))}
         </table>
      </flex>
    </div>
  );
}