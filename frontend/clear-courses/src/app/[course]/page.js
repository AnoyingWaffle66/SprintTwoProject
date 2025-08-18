"use client";
import { useParams } from 'next/navigation';
import coursesData from '../data/courses.json';
import CourseDetail from '../Components/CourseDetail';

export default function CoursePage() {
    const { course } = useParams();

    if (!course) return <p>Loading...</p>;

    const courseEntry = Object.values(coursesData).find(c => c.route.endsWith(course));
    if (!courseEntry) return <p>Course not found</p>;

    return <CourseDetail course={courseEntry} />;
}