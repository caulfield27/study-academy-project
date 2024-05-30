import { Wrapper } from '@/components/wrapper/wrapper'
import styles from './page.module.css'
import { mentors } from '@/utils/mentorsInfo'


const Mentors = () => {


    return (
        <>

            <Wrapper>
                <div className={styles.mentors_header}>
                    <h1>Humo academy mentors</h1>
                </div>
                <hr className={styles.hr} />
                <div className={styles.mentors_container}>
                    {mentors.map((mentor, id) =>
                        <div key={id + 1} className={styles.mentors_card}>
                            <div>
                                <img src={mentor.img} alt="mentor" />
                            </div>
                            <span className={styles.name}>{mentor.name}</span>
                            <span className={styles.role}>{mentor.role}</span>
                            <div className={styles.mentor_description}>{mentor.description}</div>
                        </div>
                    )}

                </div>

            </Wrapper>





        </>

    )
}

export default Mentors