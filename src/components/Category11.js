import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './styles.css';
import arrow from '../images/arrow.svg';

const Category11 = ({ onNext }) => {
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
        onNext(12);
        
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
            onNext(10);
        }
    };

    return (
        <div className="survey-section active">
            {currentQuestion === 1 && (
                <div>
                    <h2 id="question">QUESTION 1</h2>
                    <label className="title-text">How many items on your menu are completely free of animal products(e.g. no meat, no honey, no dairy, and no egg)?</label>
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
                    <label className="title-text">Is it possible to make other non-vegan items on the menu free of animal products?</label>
                    <div>
                        <button onClick={() => handleQuestionTwo('Yes')}>Yes</button>
                        <button onClick={() => handleQuestionTwo('No')}>No</button>
                        <button onClick={() => handleQuestionTwo('Unsure')}>Some</button>
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

export default Category11;
