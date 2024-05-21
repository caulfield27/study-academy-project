"use client"

import { useCourseStore } from '@/store/courses/courses'
import styles from './courseInputs.module.css'

export const CourseInputs = () => {
    const search = useCourseStore((state) => state.search)
    const setSearch = useCourseStore((state) => state.setSearch)
    const category = useCourseStore((state) => state.search)
    const setCategory = useCourseStore((state) => state.setCategory)


    return (
        <>
            <div className={styles.courses_header}>
                <h1>Humo academy programming courses</h1>
            </div>
            <div className={styles.courses_filter}>
                <input type="text"
                    placeholder='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Front-end">Front-end</option>
                    <option value="python">Python</option>
                    <option value="golang">Golang</option>
                    <option value="android">Android</option>
                </select>

            </div>
        </>

    )
}