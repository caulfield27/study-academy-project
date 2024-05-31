import styles from './result.module.css'
import ResultModal from './resultModal/resultModal';
import { Button, Rating } from "@mui/material";
import ChecklistIcon from '@mui/icons-material/Checklist';
import CircularWithValueLabel from '../progressBar/progress';
import { quizTypes } from '@/store/quizes/quizUtils/quizesTypes';
import { FunctionComponent } from 'react';
import { useBooks } from '@/store/books/books';
import { useQuizes } from '@/store/quizes/quizes';
import { quizes } from '@/store/quizes/quizUtils/questions';


const Result = () => {
    const dropdown = useBooks((state)=> state.dropdown)
    const {resetQuiz, questions, result, currentQuiz, setQuizModal
    } = useQuizes()
    const minutes = useQuizes((state)=> state.quizMinutes)
    const seconds = useQuizes((state)=> state.seconds)
    const duration = useQuizes((state)=> state.quizDuration)
    
    const handleReset =  ()=>{
        resetQuiz()
    }

    let maxPoint = 0;
    for(let i = 0; i < questions.length; i++){
        maxPoint += 10
    }

    return( 
        <>
            <ResultModal />
            <div className={dropdown ? `${styles.completed} ${styles.dropdown_active}` : styles.completed}>
                <div className={styles.completed_image}>
                    <img src='/completeOrange.jpg' alt="" />
                    <div className={styles.quiz_info}>
                        <img src={quizes[currentQuiz].img} alt="js" />
                        <div className={styles.info_text}>
                            <span className={styles.name_info}>name:<span className={styles.name}>{quizes[currentQuiz].name}</span></span>
                            <div className={styles.complex}>
                                <span className={styles.complex_text}>complexity:</span>
                                <Rating className={styles.raiting} name="quiz-complex" value={quizes[currentQuiz].complexity} precision={0.5} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.completed_result}>
                    <h1>Quiz completed! Your final result</h1>
                    <span className={styles.final_result}>{`${result} of ${maxPoint} points`}</span>
                    <div>
                        <span>Time spend: </span><span>{(duration - 1)-minutes}</span> : <span>{60-seconds}</span>
                    </div>
                    <CircularWithValueLabel progress={result} />
                    <div className={styles.complete_button_wrap}>
                        <Button variant="contained" color="success" onClick={() => setQuizModal(true)}>
                            <ChecklistIcon className={styles.button_icon} />show answers
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleReset}>
                            try again
                        </Button>

                    </div>

                </div>

            </div>
            
        </>
        
    ) 
}
 
export default Result;