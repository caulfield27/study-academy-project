import styles from './timer.module.css'

export const Timer = ({ minutes, seconds }: { minutes: number, seconds: number }) => {
    return (
        <div className={styles.timer_wrap}>
            <span>0{minutes}</span> : <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
    )

}