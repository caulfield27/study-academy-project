"use client"
import styles from './courseInputs.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SearchIcon from '@mui/icons-material/Search';


export const CourseInputs = ({ search, sort }: { search: string, sort: string }) => {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const navigate = useRouter()
    const pathName = usePathname()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        params.set('_search', e.target.value)
        navigate.replace(`${pathName}?${params}`)
    }

    const handleSelect = (e: any) => {
        params.set('_sort', e.target.value)
        navigate.replace(`${pathName}?${params}`)
    }

    return (
        <>
            <div className={styles.courses_header}>
                <h1>Humo academy programming courses</h1>
            </div>
            <div className={styles.courses_filter}>
                <div style={{display:'flex', flexDirection:'row',alignItems:'center', gap:'5px'}}>
                    <SearchIcon />
                    <input type="text"
                        placeholder='searching for course...'
                        value={search}
                        onChange={handleSearch}

                    />

                </div>
                <select className={styles.select}
                    defaultValue={sort}
                    onChange={handleSelect}
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