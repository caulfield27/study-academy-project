"use client"
import '../../../app/globals.css'
import styles from './page.module.css'
import { RadioGroup, FormControlLabel, Radio, Button } from '@mui/material'
import CircularWithValueLabel from '@/components/progressBar/progress'
import { useQuizes } from '@/store/quizes/quizes'
import QuizInfo from '@/components/quizInfo/quizInfo'
import Result from '@/components/result/result'
import { useEffect, useState } from 'react'
import { getFromStorage } from '@/utils/useLocaleStorage'
import { Wrapper } from '@/components/wrapper/wrapper'
import { Timer } from '@/components/timer/Times'

const Quiz = () => {
    const questions = useQuizes((state) => state.questions)
    const currentQuestionIndex = useQuizes((state) => state.currentQuestionIndex)
    const selectOption = useQuizes((state) => state.selectOption)
    const nextQuestion = useQuizes((state) => state.nextQuestion)
    const result = useQuizes((state) => state.result)
    const setQuestions = useQuizes((state) => state.setQuestions)
    let quizMinutes = useQuizes((state)=> state.quizMinutes)
    let quizSeconds = useQuizes((state)=> state.seconds)
    const setSeconds = useQuizes((state)=> state.setSeconds)
    const setMinutes = useQuizes((state)=> state.setMinutes)
    let currentQuestion = useQuizes((state) => state.questions[currentQuestionIndex])


    useEffect(() => {
        setQuestions(getFromStorage('questions'))
        const interval = setInterval(()=>{

            setSeconds(quizSeconds > 0 ? quizSeconds-=1 : quizSeconds)
            if(quizSeconds === 0 && quizMinutes > 0){
                setMinutes(quizMinutes-=1)
                setSeconds(59)
            }
                
            if(quizSeconds === 0 && quizMinutes === 0){
                clearInterval(interval)

            }
        }, 1000)
        return ()=> clearInterval(interval)
    }, [quizMinutes])

    const handleCheckboxChange = (event: any) => {
        selectOption(event.target.value)
    }

    const handleNextQuestion = () => {
        nextQuestion()
        
    }

    if (currentQuestionIndex > 9) {
        return (
            <>
                <Result />
            </>

        )
    }

    return (
        <>
            {currentQuestion === undefined ? <h1>Loading...</h1> :
                <Wrapper>
                    <div className={styles.quiz_container}>
                        <QuizInfo />
                        <div className={styles.quiz_content}>
                            <div className={styles.quiz_header}>
                                <div className={styles.question}>
                                    <span className={styles.q}>Question:</span><span className={styles.id}>{currentQuestion.id}</span><span className={styles.length}> | {questions.length}</span>
                                </div>
                                <Timer minutes={quizMinutes} seconds={quizSeconds}/>
                                <CircularWithValueLabel progress={result} />
                            </div>
                            <div>
                                <p>{currentQuestion.question}</p>
                            </div>
                            <div className={styles.quiz_body}>
                                <RadioGroup
                                    aria-labelledby="quiz-options"
                                    defaultValue="quiz"
                                    name="quiz-options"
                                    value={currentQuestion.selected || ''}
                                    onChange={handleCheckboxChange}
                                    className={styles.options_wrap}
                                >

                                    {currentQuestion.variants.map((variant: any, ind: number) => {
                                        return <FormControlLabel
                                            key={ind + 1}
                                            value={variant}
                                            control={<Radio checked={currentQuestion.selected === variant} color="error" />}
                                            label={variant}
                                            className={styles.quiz_options}

                                        />
                                    })}
                                </RadioGroup>

                            </div>
                            <div className={styles.quiz_footer}>
                                <Button disabled={!currentQuestion.selected} variant="contained" color="success" onClick={handleNextQuestion}>
                                    {currentQuestion.id == questions.length ? 'Finish' : `Next`}

                                </Button>
                            </div>
                        </div>

                    </div>

                </Wrapper>


            }


        </>


    )
}

export default Quiz