import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './styles.css';
import arrow from '../images/arrow.svg';

const Category13 = ({ onNext }) => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [questionOneAnswer, setQuestionOneAnswer] = useState(0);
    const [questionTwoAnswer, setQuestionTwoAnswer] = useState('');
    const [progress, setProgress] = useState(0);

    const handleQuestionOne = (event) => {
        setQuestionOneAnswer(event.target.value);
    };

    const handleQuestionTwo = (value) => {
        setQuestionTwoAnswer(value);
        setProgress(100);
        onNext(14);
        
    };

    const handleNext = () => {
        if (currentQuestion === 1) {
            setProgress(50);
            setCurrentQuestion(2);
        }
    };

    const handleBack = () => {
        if (currentQuestion === 2) {
            setProgress(50)
            setCurrentQuestion(1);
        } else {
            onNext(12)
        }
    };

    return (
        <div className="survey-section active">
            <ProgressBar progress={progress} />
            {currentQuestion === 1 && (
                <div>
                    <h2 id="question">QUESTION 1</h2>
                    <label className="title-text">How many items on your menu are free of beef but include other meats(eg. pork, chicken, fish)?</label>
                    <input 
                        type="number" 
                        value={questionOneAnswer} 
                        onChange={handleQuestionOne} 
                        min="0" 
                    />
                </div>
            )}
            {currentQuestion === 2 && (
                <div>
                    <h2 id="question">QUESTION 2</h2>
                    <label className="title-text">Is it possible to replace the beef in other items with another type of protein upon request?</label>
                    <div>
                        <button onClick={() => handleQuestionTwo('Yes')}>Yes</button>
                        <button onClick={() => handleQuestionTwo('No')}>No</button>
                        <button onClick={() => handleQuestionTwo('Sometimes')}>Sometimes</button>
                    </div>
                </div>
            )}
            <div className="navigation-buttons">
                {currentQuestion >= 1 && <button onClick={handleBack}>Back</button>}
                {currentQuestion < 2 && <button onClick={handleNext}>Next</button>}
            </div>
        </div>
    );
};

export default Category13;
