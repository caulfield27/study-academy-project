

import styles from './page.module.css'
import CourseModal from '@/components/enterCourseModal/enterCourse';
import {coursesType} from '@/store/courses/coursesTypes';
import { getApi } from '@/utils/api';
import { Course } from '@/components/course/course';
import { Wrapper } from '@/components/wrapper/wrapper';
import { CourseInputs } from '@/components/coursesInputs/courseInputs';


const CoursesCard = async () => {

    const data = await getApi('http://localhost:3002/courses')
    
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