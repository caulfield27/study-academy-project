"use client"
import '../../app/globals.css'
import styles from './pagination.module.css'
import { Stack, Pagination } from "@mui/material"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

const BooksPagination = ({ pages, currentPage }: { pages: number, currentPage: string | any }) => {

    const totalPages = Math.ceil(pages / 10)
    const navigate = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const params = new URLSearchParams(searchParams)

    const handleChangePage = (event: any, value: number) => {
        params.set('_page', value.toString())
        navigate.replace(`${pathname}?${params.toString()}`)
    };

    return (
            <Stack spacing={2}>
                <Pagination defaultValue={currentPage ? Number(currentPage) : 1} className={styles.pagination}
                    count={Math.ceil(totalPages)} page={currentPage ? Number(currentPage) : 1} onChange={handleChangePage} />
            </Stack>
    
    )
}

export default BooksPagination