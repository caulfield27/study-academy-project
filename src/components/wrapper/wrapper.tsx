"use client"
import { useBooks } from "@/store/books/books"
import styles from './wrapper.module.css'
import { ReactNode, useEffect, useState } from "react"

export const Wrapper = ({children}: {children: ReactNode})=>{
    const dropdown = useBooks((state)=> state.dropdown)

    return (
        <>
        <div className={dropdown ? `${styles.adaptive_wrapper} ${styles.wrapper}` : styles.wrapper}>
            {children}
        </div>
        </>
    )
}