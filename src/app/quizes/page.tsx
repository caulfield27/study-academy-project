"use client"
import '../../app/globals.css'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import { Button, Rating } from '@mui/material';
import { useBooks } from '@/store/books/books';
import { quizes } from '@/store/quizes/quizUtils/questions';
import { IGlobalQuestions } from '@/store/quizes/quizUtils/quizesTypes';
import { useQuizes } from '@/store/quizes/quizes';
import { setToStorage } from '@/utils/useLocaleStorage';
import { Wrapper } from '@/components/wrapper/wrapper';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import { useTheme } from '@/store/global/theme';




const Quizes = () => {
    const navigate = useRouter()
    const setQuestions = useQuizes((state) => state.setQuestions)
    const resetQuiz = useQuizes((state) => state.resetQuiz)
    const theme = useTheme((state)=> state.theme)

    const OpenQuiz = (quiz: IGlobalQuestions) => {
        navigate.push('/quizes/quiz')
        setQuestions(quiz)
        setToStorage('questions', quiz)
        resetQuiz()
    }

    return (
        <>
            <Wrapper>
                <div className={styles.quizes_header}>
                    <h1>Quizes and practice</h1>
                </div>
                <div className={styles.quizes_container}>
                    {quizes.map((quiz, ind) => {
                        return <div className={styles.quiz_card} key={ind + 1}>
                            <span className={styles.quiz_name}>{quiz.name}</span>
                            <img src={quiz.img} alt={quiz.name} />
                            <span>complexity:</span>
                            <Rating className={styles.raiting} name="quiz-complex" value={quiz.complexity} precision={0.5} readOnly />
                            <div style={{display:'flex', flexDirection:'row', 
                            justifyContent:'center', alignContent:'center', gap:'5px',}}>
                                <AvTimerIcon style={theme ? {color:'white'} : {color: 'black'}}/>
                                <span style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                                    5 min
                                </span>
                            </div>
                            <Button
                            onClick={()=> OpenQuiz(quiz)}
                            variant={theme ? 'contained' : 'outlined'}
                            color='primary'>
                            start
                        </Button>
                        </div>
                    })}
                </div>

            </Wrapper>



        </>
    )
}

export default Quizes;