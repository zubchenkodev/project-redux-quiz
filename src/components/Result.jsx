import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { restart } from '../reducers/quizReducer';
import Button from './Button';

const Result = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const answers = useSelector(store => store.quiz.answers);
  const correctAnswers = answers.filter(answer => answer.isCorrect == true);
  const wrongAnswers = answers.filter(answer => answer.isCorrect !== true);

  const totalTime = useSelector(store => store.quiz.totalTime);

  const min = Math.floor(totalTime / 60);
  const sec = totalTime % 60;

  const handleClick = () => {
      dispatch(restart());
      navigate('/');
  }

  const roundToTwoDecimalPlaces = (number) => {
    return Math.round(number * 100) / 100;
  }

  return (
    <div className='content'>
    <h2>Result</h2>
    <h3>Active game time: 
          <div>
            {min < 10 && 0}
            {min}:
            {sec < 10 && 0}
            {sec}
          </div>
    </h3>
    <div className="statistics">
        <div className="statistics__correct">
          <span className="procentage-correct">{ roundToTwoDecimalPlaces(correctAnswers.length / answers.length * 100)} %</span>
          <h3>{correctAnswers.length} correct answers</h3>
          {correctAnswers.map((answer, index) => <div key={index}>
            <h4>{answer.question.id}. {answer.question.question}</h4>
            <p>Your answer: <span className='correct'>{answer.answer}</span></p>
          </div>)}
        </div>

        <div className="statistics__incorrect">
          <span className="procentage-incorrect">{roundToTwoDecimalPlaces(wrongAnswers.length / answers.length * 100)} %</span>
          <h3>{wrongAnswers.length} wrong answers</h3>
          {wrongAnswers.map((answer, index) => <div key={index}>
            <h4>{answer.question.id}. {answer.question.question}</h4>
            <p>Your answer: <span className='wrong'>{answer.answer}</span></p>
            <p>Correct answer: <span className='correct'>{answer.question.options[answer.question.answer]}</span></p>
          </div>)}
        </div>    
    </div>
    <Button onClick={handleClick}>Start over</Button>
    </div>
  )
}

export default Result;