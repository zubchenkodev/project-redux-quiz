import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const Footer = () => {

  const questionsLength = useSelector(store => store.quiz.questions).length;
  const answeredQuestions = useSelector(store => store.quiz.answers).length;
  const percentage = answeredQuestions / questionsLength * 100;

  const indicatorStyles = {
    width: `${percentage}%`
  }

  const roundToTwoDecimalPlaces = (number) => {
    return Math.round(number * 100) / 100;
  }
 
  return (
    <footer className='footer'>
      <div className="container">
        <p>{`You have answered ${answeredQuestions} out of ${questionsLength} questions (${roundToTwoDecimalPlaces(percentage)}%)`}</p> 
        <div className="current-result">
          <div className="indicator" style={indicatorStyles}>   
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer