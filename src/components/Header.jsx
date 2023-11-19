import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { restart } from '../reducers/quizReducer';

const Header = () => {

  const points = useSelector(store => store.quiz.points);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(restart());
    navigate('/');
  }
  
  return (
    <header className='header'>
      <div className="container">
        <div>
        <h1>React Quiz</h1>
        <p>Points: <span>{points}</span></p>
        </div>
        <Button onClick={handleClick}>Restart</Button>
      </div>
    </header>
  )
}

export default Header