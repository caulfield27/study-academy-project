"use client"

import "./globals.css";
import Sidebar from "@/components/sidebar/sidebar";
import useAuth from "@/store/auth/auth";
import { useBooks } from "@/store/books/books";
import { useCourseStore } from "@/store/courses/courses";
import { useEffect, useState } from "react";
import { setUserFavBooks } from "@/store/books/books";
import { getFromStorage } from "@/utils/useLocaleStorage";
import { setUserFavCourse } from "@/store/courses/courses";
import { useTheme } from "@/store/global/theme";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  const isAuth = useAuth((state) => state.isAuth)
  const { getUserFavorites } = useBooks()
  const { getUserCourses } = useCourseStore()
  const currentUser = useAuth((state) => state.currentUser)
  const getCounter = useCourseStore((state) => state.getCounter)
  const getBooksCounter = useBooks((state) => state.getBooksCounter)
  const theme = useTheme((state)=> state.theme)
  const setTheme = useTheme((state)=> state.setTheme)



  useEffect(() => {
    if (isAuth) {
      setUserFavBooks(getFromStorage('favorites'), getUserFavorites, currentUser)
      setUserFavCourse(getFromStorage('favCourses'), currentUser, getUserCourses,)
    }

  }, [isAuth])

  useEffect(() => {
    if (getFromStorage('favCourseCounter')) {
      getCounter(getFromStorage('favCourseCounter'))
    }
    if (getFromStorage('favBooksCounter')) {
      getBooksCounter(getFromStorage('favBooksCounter'))
    }
    if(getFromStorage('theme')){
      if(getFromStorage('theme') === 'light'){
        setTheme(false)
      }else{
        setTheme(true)
      }
  
    }
   
    
  }, [])

  return (
    <html lang="en">
      <body className={!theme ? 'light' : 'dark'}>
        <div className='app-container'>
          <Sidebar />
          <div className="pages-content">
            {children}
          </div>
        </div>

      </body>
    </html>
  );
}
