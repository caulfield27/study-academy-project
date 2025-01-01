"use client"

import styles from './libraryHeader.module.css'
import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from '@/hooks/useDebounce';



const BooksSearch = () => {

    const navigate = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [searchValue, setSearchValue] = useState(searchParams.get('_search') ?? "");
    const debounedValue = useDebounce(searchValue);

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.set('_search', debounedValue);
        navigate.replace(pathname+'?'+String(params));
    }

    useEffect(()=>{
        handleSearch()
    }, [debounedValue])


    return (
        <>
            <div className={styles.library_navigation}>
                <SearchIcon />
                <input placeholder="Search book..." value={searchValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setSearchValue(e.target.value)}
                />
            </div>
        </>

    )
}

export default BooksSearch