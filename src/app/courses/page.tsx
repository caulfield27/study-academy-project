
import styles from './page.module.css'
import CourseModal from '@/components/enterCourseModal/enterCourse';
import {coursesType} from '@/store/courses/coursesTypes';
import { Course } from '@/components/course/course';
import { Wrapper } from '@/components/wrapper/wrapper';
import { CourseInputs } from '@/components/coursesInputs/courseInputs';
import { fetchData } from '@/utils/api';
import { CircularProgress } from '@mui/material';


const CoursesCard = async ({searchParams} : {searchParams? : {_search: string}}) => {
    const data = await fetchData(`${process.env.BASED_URL}/api/courses?_search=${searchParams?._search??''}`)   
    
    return (
        <>

            <CourseModal />
            <Wrapper>
                <CourseInputs search={searchParams?._search??''}/>
                <div className={styles.cards_container}>
                    {!process.env.BASED_URL ? 
                        <CircularProgress/> :
                        data.map((course: coursesType) =>
                            <Course course={course} key={course.id} />
                        )
                    }
                </div>

            </Wrapper>

        </>


    )

}

export default CoursesCard;