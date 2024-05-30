"use client"
import styles from './courseInputs.module.css'
import { FunctionComponent } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'



export const CourseInputs = ({search}: {search: string}) => {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const navigate = useRouter()
    const pathName = usePathname()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
        params.set('_search', e.target.value)
        navigate.replace(`${pathName}?${params.toString()}`)

        
    } 

    return (
        <>
            <div className={styles.courses_header}>
                <h1>Humo academy programming courses</h1>
            </div>
            <div className={styles.courses_filter}>
                <input type="text"
                    placeholder='search...'
                    value={search}
                    onChange={handleSearch}
                />
                {/* <select
                    // value={category}
                    // onChange={(e) => setCategory(e.target.value)}
                // >
                //     <option value="">All Categories</option>
                //     <option value="Front-end">Front-end</option>
                //     <option value="python">Python</option>
                //     <option value="golang">Golang</option>
                //     <option value="android">Android</option>
                // </select> */}

            </div>
        </>

    )
}