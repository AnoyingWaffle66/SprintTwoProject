'use client'
import Link from "next/link";
import coursesData from "./public/Data/courses.json";
import { useState } from 'react';
import './globals.css'

export default function Home() {
    const courses = Object.values(coursesData);

    var dump = new Set(courses.map(course => (course.course_code.substring(0, 3))));
    var codes = [...dump];
    var tabledata = ""

    function check_match(input, search) {
        return "" +input === "" + search
    }
    function generateRows() {
        return courses.map(course => (
            <tr class={course.course_code.substring(0, 3)} key={course.route}>
                <td class="course"><Link href={`/${encodeURIComponent(course.route.split('/').pop())}`}>
                    {course.course_name}
                </Link></td>
                <td class="code">{course.course_code}</td>
            </tr>
        ))
    }
    function buildTHead() {
        return (
            <tr>
                <td id="title"><h1>Courses</h1></td>
                <td id="dropperbar">
                    <select name="category" id="category" onChange={e => refresh_table(e.target.value)}>
                        <option selected value="none">---</option>
                        {codes.map(code => (
                            <option value={code}>{code}</option>
                        ))}
                    </select>
                </td>
            </tr>
            )
    }
    async function refresh_table(term) {
        console.log(term)
        if (!document) return false
        else {
            var cTable = document.getElementsByClassName("course_data")[0]
            if (tabledata === "") {
                tabledata = document.getElementsByClassName("course_data")[0].innerHTML.split("</tr>")
                console.log(tabledata)
            }
            cTable.innerHTML = ""
            if (!check_match("none", term)) {
                tabledata.map(d => {
                    console.log(d)
                    if (d.includes(`class="${term}"`)) {
                        cTable.innerHTML += `${d}</tr>`
                    }
                })
            }
            else {
                tabledata.map(d => cTable.innerHTML += `${d}</tr>`)
            }
        }
    }

    return (
        <div class="main_content">
            <table class="course_table">
                <thead>
                    {buildTHead() }
                </thead>
                <tbody class="course_data">
                    {generateRows()}
                </tbody>
            </table>

        </div>
    );

}


