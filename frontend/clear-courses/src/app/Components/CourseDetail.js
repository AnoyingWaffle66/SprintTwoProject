import Link from 'next/link';
import coursesData from '../data/courses.json';

export default function CourseDetail({ course }) {
    const renderLinks = (list) => {
        if (list === undefined || list.length == 0) {
            return (
                <li key="list">
                    <p>No X-Requisite course found</p>
                </li>
            );
        }
        return list.map(courseObj => {
            const courseCode = courseObj.course_code;
            const courseName = courseObj.course_name;
            const slug = courseCode.toLowerCase();
            return (
                <li key={courseObj.course_code}>
                    <Link href={`/${slug}`}>{courseCode} - {courseName}</Link>
                </li>
            );
        });
    };

    return (
        <div className="main_content">
            <h1 id="title">{course.course_name}</h1>
            <h2 className="section">Description</h2>
            <p className="course_deet"><em id="desc">{course.course_description}</em></p>
            <h2 className="section">Pre-requisites</h2>
            <ul className="course_deet">{renderLinks(course.requisites.pre)}</ul>
            <h2 className="section">Pre-for</h2>
            <ul className="course_deet">{renderLinks(course.requisites['pre-for'])}</ul>
            <h2 className="section">Co-requisites</h2>
            <ul className="course_deet">{renderLinks(course.requisites.co)}</ul>
            <Link href="/">⇦ Back to Courses</Link>
        </div>
    );
}