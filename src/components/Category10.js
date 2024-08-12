import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './styles.css';
import arrow from '../images/arrow.svg';

const Category10 = ({ onNext }) => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [questionOneAnswer, setQuestionOneAnswer] = useState(0);
    const [questionTwoAnswer, setQuestionTwoAnswer] = useState(0);
    const [questionThreeAnswer, setQuestionThreeAnswer] = useState('');
    const [progress, setProgress] = useState(0);

    const handleQuestionOne = (event) => {
        setQuestionOneAnswer(event.target.value);
    };

    const handleQuestionTwo = (event) => {
        setQuestionTwoAnswer(event.target.value);
    };

    const handleQuestionThree = (value) => {
        setQuestionThreeAnswer(value);
        setProgress(100);
        const score = calculateScore(questionOneAnswer, questionTwoAnswer, value);
        onNext(11, score)
    };

    const handleNext = () => {
        if (currentQuestion === 1) {
            setProgress(33);
            setCurrentQuestion(2);
        } else if (currentQuestion === 2) {
            setProgress(66);
            setCurrentQuestion(3);
        } 
    };

    const handleBack = () => {
        if (currentQuestion === 3) {
            setProgress(66);
            setCurrentQuestion(2);
        } else if (currentQuestion === 2) {
            setProgress(33);
            setCurrentQuestion(1);
        } else {
            onNext(9);
        }
    };
    
    const calculateScore = (totalItems, vegetarianItems, canModify) => {
        let score = 0;
        const vegetarian = (vegetarianItems / totalItems) * 100;
      
        if (canModify === 'Yes') {
          if (vegetarian > 50) {
            score = totalItems * (2 - 0.01 * totalItems);
          } else {
            score = totalItems * (1 + 0.01 * totalItems);
          }
        } else if (canModify === 'Unsure') {
          if (vegetarian > 50) {
            score = totalItems * (1.87 - 0.01 * totalItems);
          } else {
            score = 15 * (1 + 0.01 * totalItems);
          }
        } else if (canModify === 'No') {
          score = totalItems; // score stays the same
        }
      
        return score;
      };
         

    return (
        <div className="survey-section active">
            {currentQuestion === 1 && (
                <div>
                    <h2 id="question">QUESTION 1</h2>
                    <label className="title-text">How many items does your menu have in total?</label>
                    <div className="form-control">
                        <input 
                            className="input input-alt" 
                            placeholder="Enter a number" 
                            required 
                            type="number" 
                        />
                        <span className="input-border input-border-alt"></span>
                    </div>
                </div>
            )}
            {currentQuestion === 2 && (
                <div>
                    <h2 id="question">QUESTION 2</h2>
                    <label className="title-text">How many of your menu items are free of meat but include other animal products (e.g., dairy, eggs, or honey)?</label>
                    <div className="form-control">
                        <input 
                            className="input input-alt" 
                            placeholder="Enter a number" 
                            required 
                            type="number" 
                        />
                        <span className="input-border input-border-alt"></span>
                    </div>
                </div>
            )}
            {currentQuestion === 3 && (
                <div>
                    <h2 id="question">QUESTION 3</h2>
                    <label className="title-text">Do you offer plant-based protein options (e.g., beans, lentils, tofu) as substitutes for meat in other non-vegetarian dishes?</label>
                    <div>
                        <button className="options" onClick={() => handleQuestionThree('Yes')}>Yes</button>
                        <button className="options" onClick={() => handleQuestionThree('No')}>No</button>
                        <button className="options" onClick={() => handleQuestionThree('Unsure')}>Unsure</button>
                    </div>
                </div>
            )}
            <div className="navigation-buttons">
                {currentQuestion >= 1 && <button onClick={handleBack}>Back</button>}
                {currentQuestion < 3 && <button onClick={handleNext}>Next</button>}
            </div>
        </div>
    );
};

export default Category10;
