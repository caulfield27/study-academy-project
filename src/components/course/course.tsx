"use client"
import styles from './course.module.css'
import { getFromStorage, setToStorage } from '@/utils/useLocaleStorage'
import { coursesType } from '@/store/courses/coursesTypes'
import useAuth from '@/store/auth/auth'
import { useCourseStore } from '@/store/courses/courses'
import { IFavCourse } from '@/store/courses/coursesTypes'
import Swal from 'sweetalert2'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material'
import { useBooks } from '@/store/books/books'

export const Course = ({ course }: { course: coursesType }) => {
    const favoriteCourses = useCourseStore((state) => state.favoriteCourses)
    const getUserCourses = useCourseStore((state) => state.getUserCourses)
    let favCounter = useCourseStore((state) => state.favCounter)
    const isAuth = useAuth((state) => state.isAuth)
    const setCourseModal = useCourseStore((state) => state.setCourseModal)
    const decrementFavCounter = useCourseStore((state) => state.decrementGFavCounter)
    const incrementFavCounter = useCourseStore((state) => state.incrementFavCounter)
    let totalNotifications = useBooks((state)=> state.totalNotifications)
    const setTotalNotifications = useBooks((state)=> state.setTotalNotifications)
    const currentUser = useAuth((state) => state.currentUser)

    const handleCourseModal = () => {
        setCourseModal(true)
        document.body.classList.add('open_modal')
    }

    const handleFavoriteCourse = (currentCourse: any) => {
        const getFavStorage = getFromStorage('favCourses')

        if (isAuth) {
            if (favoriteCourses.some(favCourse => favCourse.favCourse.id === currentCourse.id)) {
                const filtered = favoriteCourses.filter((course) => course.favCourse.id !== currentCourse.id)
                getUserCourses(filtered)
                if (getFavStorage) {
                    const removeCourse = getFavStorage.filter((curCourse: IFavCourse) => curCourse.favCourse.id !== currentCourse.id)
                    setToStorage('favCourses', removeCourse)
                }
                if (favCounter !== 0) {
                    decrementFavCounter(favCounter -= 1)
                    setTotalNotifications(totalNotifications -= 1)
                }


            } else {
                const favCourse = { userToken: currentUser[0].userToken, favCourse: currentCourse }
                if (getFavStorage) {
                    getFavStorage.push(favCourse)
                    setToStorage('favCourses', getFavStorage)
                    const newFavList = [...favoriteCourses, favCourse]
                    getUserCourses(newFavList)
                }else{
                    const newFavCourses = []
                    newFavCourses.push(favCourse)
                    setToStorage('favCourses',newFavCourses)
                    
                }
                incrementFavCounter(favCounter += 1)
                setTotalNotifications(totalNotifications += 1)




                    Swal.fire({
                        text: 'added to favorite courses',
                        icon: 'success'
                    })

                }
            } else {
                Swal.fire({
                    text: 'Log in or sign up to adding favovrite courses',
                    icon: 'info',
                    footer: '<a href="/auth/login">log in?</a>',
                    showConfirmButton: false

                })
            }

        }



        return (
            <div className={styles.card}>
                <span className={styles.favoriteCardText}>Add to favorites</span>
                <FavoriteIcon onClick={() => handleFavoriteCourse(course)} className={favoriteCourses.some(favcourse => favcourse.favCourse.id === course.id) ? `${styles.favCard_active} ${styles.cards_favorites}` : styles.cards_favorites} />
                <div className={styles.card_left}>
                    <h2>{course.name}</h2>
                    <span className={styles.mentor}>{course.mentor}</span>
                    <div className={styles.languages_wrap}>
                        <p>You will learn &darr;</p>
                        <div className={styles.language_img}>
                            {course.languages.map((language, id) =>
                                <img src={language} alt="altf4" key={id + 1} />
                            )}
                        </div>
                    </div>
                    <div className={styles.orange}>
                        <span>start {course.courseStart}</span>
                    </div>
                </div>
                <div className={styles.card_right}>
                    <img src={course.image} alt="" />
                    <div className={styles.card_buttons}>
                        <Button variant='outlined'
                            color='secondary'
                            onClick={handleCourseModal}
                        >sign up</Button>
                    </div>
                </div>


            </div>
        )
    }