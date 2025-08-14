import Link from 'next/link';
import coursesData from '../public/Data/courses.json';

export default function CourseDetail({ course }) {
    const renderLinks = (list) => {
        return list.map(r => {
            const courseObj = coursesData[r];
            const courseName = courseObj ? courseObj.course_name : r.split('/').pop();
            const slug = r.split('/').pop();
            return (
                <li key={r}>
                    <Link href={`/${slug}`}>{courseName}</Link>
                </li>
            );
        });
    };

    return (
        <div>
            <h1>{course.course_name}</h1>
            <h2>Pre-requisites</h2>
            <ul>{renderLinks(course.requisites.pre)}</ul>
            <h2>Pre-for</h2>
            <ul>{renderLinks(course.requisites['pre-for'])}</ul>
            <h2>Co-requisites</h2>
            <ul>{renderLinks(course.requisites.co)}</ul>
            <Link href="/">Back to Courses</Link>
        </div>
    );
}