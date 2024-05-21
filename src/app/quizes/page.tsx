"use client"
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import { Rating } from '@mui/material';
import { useBooks } from '@/store/books/books';
import { quizes } from '@/store/quizes/quizUtils/questions';
import { IGlobalQuestions } from '@/store/quizes/quizUtils/quizesTypes';
import { useQuizes } from '@/store/quizes/quizes';
import { setToStorage } from '@/utils/useLocaleStorage';
import { Wrapper } from '@/components/wrapper/wrapper';




const Quizes = () => {
    const navigate = useRouter()
    const dropdown = useBooks((state) => state.dropdown)
    const setQuestions = useQuizes((state) => state.setQuestions)
    const resetQuiz = useQuizes((state) => state.resetQuiz)



    const OpenQuiz = (quiz: IGlobalQuestions) => {
        navigate.push('/quizes/quiz')
        setQuestions(quiz)
        setToStorage('questions', quiz)
        resetQuiz()
    }

    return (
        <>
            <Wrapper>
                <div className={styles.quizes_container}>
                    {quizes.map((quiz, ind) => {
                        return <div className={styles.quiz_card} key={ind + 1} onClick={() => OpenQuiz(quiz)}>
                            <span className={styles.quiz_name}>{quiz.name}</span>
                            <img src={quiz.img} alt={quiz.name} />
                            <span>complexity:</span>
                            <Rating className={styles.raiting} name="quiz-complex" value={quiz.complexity} precision={0.5} readOnly />
                        </div>
                    })}
                </div>

            </Wrapper>



        </>
    )
}

export default Quizes;