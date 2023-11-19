import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { timeIsOver } from '../reducers/quizReducer';


const Timer = ({remainingTime, setRemainingTime, setIsAnswered, questionId, isAnswered}) => {

    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime % 60;

    const dispatch = useDispatch();

    const answerPayload = {
        questionId
    };
    
    useEffect(() => {
        setRemainingTime(30);
    }, [questionId, setRemainingTime]);

    useEffect(() => {
        if (remainingTime <= 0) {
            dispatch(timeIsOver(answerPayload));
            setIsAnswered(true);

        }
    },[setIsAnswered, remainingTime])


    useEffect(() => {
        let interval;
        if (!isAnswered) {
            interval = setInterval(() => {
                setRemainingTime(remainingTime => remainingTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isAnswered, setRemainingTime]);

    return (
        <div className="timer">
            {remainingTime <= 0 ? <p>Time is up</p> :
            <div>
            {min < 10 && 0}
            {min}:
            {sec < 10 && 0}
            {sec}
            </div>
            }
        </div>
    )
}

export default Timer