import CourseItem from './CourseItem';

export default function CourseList({ courses }) {
    return (
        <div>
            <ul>
                {courses.map(course => (
                    <CourseItem key={course.route} course={course} />
                ))}
            </ul>
        </div>
    );
}