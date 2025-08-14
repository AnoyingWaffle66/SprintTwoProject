import Link from "next/link";

export default function CourseItem({ course }) {
    const slug = course.route.split('/').pop();

    return (
        <li>
            <Link href={`/${slug}`}>
                {course.course_name}
            </Link>
        </li>
    );
}