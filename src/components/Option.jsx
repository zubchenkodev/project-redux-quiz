import React from 'react';
import { submitAnswer, updateTotalTime } from '../reducers/quizReducer';
import { useDispatch, useSelector } from "react-redux";


const Option = ({option, isCorrect, setIsAnswered, isAnswered, questionId, answerIndex, remainingTime}) => {

  const dispatch = useDispatch();
  

  const answerPayload = {
    questionId,
    answerIndex
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(submitAnswer(answerPayload));
    setIsAnswered(true);
    dispatch(updateTotalTime(30 - remainingTime))
  }

  return (
    <div className={`option ${isAnswered && isCorrect ? '-correct' : '' }`} onClick={!isAnswered ? handleClick : null}>
      <p>{option}</p>
    </div>
  )
}

export default Option