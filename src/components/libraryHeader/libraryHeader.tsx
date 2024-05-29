"use client"
import { Pagination, Stack, TextField } from "@mui/material"
import styles from './libraryHeader.module.css'
import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"



const LibraryHeader = ({pages, currentPage}:{pages: number,currentPage:string | any})=>{
    const totalPages = Math.ceil(pages) / 10
    const navigate = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    
    const handleChangePage = (event: any, value: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('_page', value.toString())
        navigate.replace(`${pathname}?${params.toString()}`)
    };


    return (
        <>
            <div className={styles.library_navigation}>
                <TextField id="outlined-basic" label="Search book..." variant="outlined" color="success"
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