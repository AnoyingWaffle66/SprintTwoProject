'use client'
import Link from "next/link";
import coursesData from "./data/courses.json";
import { useState } from 'react';
import './globals.css'

export default function Home() {
    const courses = Object.values(coursesData);

    const [category, setCategory] = useState("none");
    const [searchTerm, setSearchTerm] = useState("");

    const codes = [...new Set(courses.map(course => course.course_code.substring(0, 3)))];

    // Filtered courses (by dropdown + search)
    const filteredCourses = courses.filter(course => {
        const matchesCategory = category === "none" || course.course_code.startsWith(category);
        const matchesSearch =
            course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.course_code.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    function generateRows() {
        return filteredCourses.map(course => (
            <tr className={course.course_code.substring(0, 3)} key={course.route}>
                <td className="course">
                    <Link href={`/${encodeURIComponent(course.route.split('/').pop())}`}>
                        {course.course_name}
                    </Link>
                </td>
                <td className="code">{course.course_code}</td>
            </tr>
        ));
    }

    function buildTHead() {
        return (
            <tr>
                <td id="title" style={{ position: "relative" }}>
                    <h1 style={{ margin: 0, textAlign: "center" }}>Courses</h1>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "150px",
                            padding: "4px 6px",
                            fontSize: "14px"
                        }}
                    />
                </td>
                <td id="dropperbar">
                    <select
                        name="category"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="none">---</option>
                        {codes.map(code => (
                            <option value={code} key={code}>{code}</option>
                        ))}
                    </select>
                </td>
            </tr>
        );
    }

    return (
        <div className="main_content">
            <table className="course_table">
                <thead>
                    {buildTHead()}
                </thead>
                <tbody className="course_data">
                    {generateRows()}
                </tbody>
            </table>
        </div>
    );
}