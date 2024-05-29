"use client"

import "./globals.css";
import Sidebar from "@/components/sidebar/sidebar";
import useAuth from "@/store/auth/auth";
import { useBooks } from "@/store/books/books";
import { useCourseStore } from "@/store/courses/courses";
import { useEffect } from "react";
import { setUserFavBooks } from "@/store/books/books";
import { getFromStorage } from "@/utils/useLocaleStorage";
import { setUserFavCourse } from "@/store/courses/courses";

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
  const courseNot = useCourseStore((state) => state.favCounter)

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
  }, [])

  return (
    <html lang="en">
      <body>
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
