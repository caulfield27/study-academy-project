"use client"
import { Pagination, Stack, TextField } from "@mui/material"
import styles from './libraryHeader.module.css'
import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"


const LibraryHeader = ({pages}:{pages: number})=>{
    const [currentPage, setPage] = useState(1)
    const [postModal, setPostModal] = useState(false)
    const totalPages = Math.ceil(pages) / 10
    
    const navigate = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    console.log(pages)


    const handlePostModal = () =>{
        setPostModal(true)
        document.body.classList.add('open_modal')
    }

    const handleChangePage = (event: any, value: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('_page', value.toString())
        navigate.replace(`${pathname}?${params.toString()}`)
        setPage(value)
       
    };


    return (
        <>
            <div className={styles.library_navigation}>
                <TextField id="outlined-basic" label="Search book..." variant="outlined" color="success"
                     />
            </div>

            <Stack spacing={2} className={styles.pagination_wrap}>
                <Pagination className={styles.pagination} defaultValue={currentPage} count={Math.ceil(totalPages)} page={currentPage} onChange={handleChangePage} />
            </Stack>
        </>

    )
}

export default LibraryHeader