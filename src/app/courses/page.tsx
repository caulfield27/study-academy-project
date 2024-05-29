
import styles from './page.module.css'
import CourseModal from '@/components/enterCourseModal/enterCourse';
import {coursesType} from '@/store/courses/coursesTypes';
import { Course } from '@/components/course/course';
import { Wrapper } from '@/components/wrapper/wrapper';
import { CourseInputs } from '@/components/coursesInputs/courseInputs';
import { fetchData } from '@/utils/api';
import { CircularProgress } from '@mui/material';


const CoursesCard = async () => {
    const data = await fetchData(`${process.env.BASED_URL}/api/courses`)   
    
    return (
        <>

            <CourseModal />
            <Wrapper>
                <CourseInputs/>
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