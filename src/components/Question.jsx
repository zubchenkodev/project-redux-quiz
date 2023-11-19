import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Option from './Option';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { finish, goToNextQuestion } from '../reducers/quizReducer';
import Timer from './Timer';

const Question = () => {

    const [isAnswered, setIsAnswered] = useState(false);
    const [remainingTime, setRemainingTime] = useState(30);

    const questions = useSelector(store => store.quiz.questions);

    const questionId = useSelector(store => store.quiz.currentQuestionId);

    const points = useSelector(store => store.quiz.points);

    const question = questions.find(question => question.id === +questionId );

    const minimumPoints = -3;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleClickOnNext = () => {
        dispatch(goToNextQuestion());
        setIsAnswered(false)
        navigate(`/question/${+questionId}`)
        if (points <= minimumPoints) {
            dispatch(finish());
            navigate('/result');
        }
    }

    const handleClickOnResult = () => {
        dispatch(finish());
        navigate('/result');
    }
    
    return (
        <div className='content'>
            <h2>Question # {questionId}</h2>
            <h3>{question.question}</h3>
            {question.image && 
                <img src={question.image} alt="Question image" />
            }
            <div className="options">
                {question.options.map((option, index) => <Option questionId={questionId} answerIndex={index} option={option} setIsAnswered={setIsAnswered} isAnswered={isAnswered} key={option} isCorrect={index === question.answer} remainingTime={remainingTime}/>)}
            </div>
            <div className="content__footer">
                <Timer remainingTime={remainingTime} setRemainingTime={setRemainingTime} setIsAnswered={setIsAnswered} questionId={questionId} isAnswered={isAnswered}/>
                {isAnswered && questions.length > questionId ?
                    <Button onClick={handleClickOnNext} type={points > minimumPoints ? 'normal' : 'danger'}>{points > minimumPoints ? 'Next Question' : 'Game over. Check your result'}</Button>
                    :
                    isAnswered &&
                    <Button onClick={handleClickOnResult}>Result</Button>
                }
            </div>
        </div>
    )
}

export default Question;