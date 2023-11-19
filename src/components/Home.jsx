import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { start, updateTotalTime } from '../reducers/quizReducer';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    dispatch(start());
    navigate('/question/1'); 
    
  }


  return (
    <div className='content'>
        <h2>Welcome to the Wild Cats Quiz!</h2>
        <h3>Test your knowledge with six questions. Choose the correct answer from the four options, but be careful – once you answer a question, it's final!</h3>
        <div className="button">
          <Button onClick={handleClick}>Let's go</Button>
        </div>
    </div>
  )
}

export default Home