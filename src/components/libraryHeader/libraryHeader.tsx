"use client"
import { Pagination, Stack, TextField } from "@mui/material"
import styles from './libraryHeader.module.css'
import React, { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"



const LibraryHeader = ({pages, currentPage, search}:{pages: number,currentPage:string | any, search:string})=>{
    const totalPages = Math.ceil(pages) / 10
    const navigate = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const params = new URLSearchParams(searchParams)
    
    const handleSearch = (e:any)=>{
        params.set('_search', e.target.value)
        navigate.replace(`${pathname}?${params.toString()}`)

    }
    
    const handleChangePage = (event: any, value: number) => {
        params.set('_page', value.toString())
        navigate.replace(`${pathname}?${params.toString()}`)
    };


    return (
        <>
            <div className={styles.library_navigation}>
                <input  placeholder="Search book..." value={search}
                onChange={handleSearch}
                     />
            </div>

            <Stack spacing={2} className={styles.pagination_wrap}>
                <Pagination className={styles.pagination} defaultValue={currentPage ? Number(currentPage) : 1} 
                count={Math.ceil(totalPages)} page={currentPage ? Number(currentPage) : 1} onChange={handleChangePage} />
            </Stack>
        </>

    )
}

export default LibraryHeader