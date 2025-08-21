import Link from 'next/link';
import coursesData from '../public/Data/courses.json';

export default function CourseDetail({ course }) {
    const renderLinks = (list) => {
        if (list === undefined || list.length == 0) {
            return (
                <li key="list">
                    <p>None</p>
                </li>
            );
        }
        return list.map(courseObj => {
            const courseCode = courseObj.course_code;
            const courseName = courseObj.course_name;
            return (
                <li key={courseObj}>
                    <Link href={`/${courseCode}`}>{courseCode} - {courseName}</Link>
                </li>
            );
        });
    };

    return (
        <div>
            <h1 id="title">{course.course_name}</h1>
            <h2 class="section">Pre-requisites</h2>
            <ul>{renderLinks(course.requisites.pre)}</ul>
            <h2 class="section">Pre-for</h2>
            <ul>{renderLinks(course.requisites['pre-for'])}</ul>
            <h2 class="section">Co-requisites</h2>
            <ul>{renderLinks(course.requisites.co)}</ul>
            <Link href="/">⇦ Back to Courses</Link>
        </div>
    );
}