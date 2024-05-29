
import styles from './page.module.css'
import CourseModal from '@/components/enterCourseModal/enterCourse';
import {coursesType} from '@/store/courses/coursesTypes';
import { Course } from '@/components/course/course';
import { Wrapper } from '@/components/wrapper/wrapper';
import { CourseInputs } from '@/components/coursesInputs/courseInputs';
import { fetchData } from '@/utils/api';


const CoursesCard = async () => {
    if(!process.env.BASED_URL){
        return (
            <h1>LOADING...</h1>
        )
    }
    const data = await fetchData(`${process.env.BASED_URL}/api/courses`)   
    
    return (
        <>

            <CourseModal />
            <Wrapper>
                <CourseInputs/>
                <div className={styles.cards_container}>
                    {
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