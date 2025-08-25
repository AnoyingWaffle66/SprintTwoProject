import Link from 'next/link';
import coursesData from '../public/Data/courses.json';

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
                <li key={courseObj}>
                    <Link href={`/${slug}`}>{courseCode} - {courseName}</Link>
                </li>
            );
        });
    };

    return (
        <div class="main_content">
            <h1 id="title">{course.course_name}</h1>
            <h2 class="section">Description</h2>
            <p class="course_deet"><em id="desc">{course.course_description}</em></p>
            <h2 class="section">Pre-requisites</h2>
            <ul class="course_deet">{renderLinks(course.requisites.pre)}</ul>
            <h2 class="section">Pre-for</h2>
            <ul class="course_deet">{renderLinks(course.requisites['pre-for'])}</ul>
            <h2 class="section">Co-requisites</h2>
            <ul class="course_deet">{renderLinks(course.requisites.co)}</ul>
            <Link href="/">⇦ Back to Courses</Link>
        </div>
    );
}