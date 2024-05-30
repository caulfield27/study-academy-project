"use client"

import styles from './libraryHeader.module.css'
import React, { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import SearchIcon from '@mui/icons-material/Search';



const BooksSearch = ({ search }: { search: string }) => {

    const navigate = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const params = new URLSearchParams(searchParams)

    const handleSearch = (e: any) => {
        params.set('_search', e.target.value)
        navigate.replace(`${pathname}?${params.toString()}`)

    }


    return (
        <>
            <div className={styles.library_navigation}>
                <SearchIcon />
                <input placeholder="Search book..." value={search}
                    onChange={handleSearch}
                />
            </div>
        </>

    )
}

export default BooksSearch