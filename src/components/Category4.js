import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './styles.css';
import arrow from '../images/arrow.svg';


const Category4 = ({ onNext }) => {
  const [peanuts, setPeanuts] = useState('');
  const [isQuestionTwoYes, setIsQuestionTwoYes] = useState(false);
  const [isQuestionTwoNotSure, setIsQuestionTwoNotSure] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [peanutsMenuAmount, setPeanutsMenuAmount] = useState('');
  const [isPeanutsFree, setIsPeanutsFree] = useState('');
  const [isQuestionOneVisible, setIsQuestionOneVisible] = useState(true);
  const [isQuestionThreeVisible, setIsQuestionThreeVisible] = useState(false);
  const [isQuestionFourVisible, setIsQuestionFourVisible] = useState(false);
  const [isQuestionThreeAmountVisible, setIsQuestionThreeAmountVisible] = useState(true);
  const [isQuestionThreeRequestVisible, setIsQuestionThreeRequestVisible] = useState(false);
  const [isQuestionTwoAmountVisible, setIsQuestionTwoAmountVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    let progressValue = 0;
    if (peanuts) progressValue += 20;
    if (isQuestionTwoYes || isQuestionTwoNotSure) progressValue += 20;
    if (peanutsMenuAmount) progressValue += 20;
    if (isQuestionThreeRequestVisible || isQuestionFourVisible) progressValue += 20;
    if (peanuts === 'no' || (peanuts === 'yes' && peanutsMenuAmount) || (peanuts === 'not-sure' && isPeanutsFree === 'no')) progressValue += 20;
    console.log('Updated Progress:', progressValue);
    setProgress(progressValue);
  }

  // QUESTION 1 (YES/NO/UNSURE)
  const handleQuestion1 = (value) => {
    if (peanuts === value) {
      setPeanuts('');
      setIsQuestionTwoYes(false);
      setIsQuestionTwoNotSure(false);
      setCheckedIngredients([]);
      setPeanutsMenuAmount('');
      setIsPeanutsFree('');
      setIsQuestionOneVisible(true);
      setIsQuestionThreeVisible(false);
      setIsQuestionFourVisible(false);
      setIsQuestionThreeAmountVisible(false);
      setIsQuestionThreeRequestVisible(false);
      setIsQuestionTwoAmountVisible(true);
      setProgress(0);
    } else {
      setPeanuts(value);
      setIsQuestionTwoYes(value === 'yes');
      setIsQuestionTwoNotSure(value === 'not-sure');
      if (value !== 'not-sure') {
        setCheckedIngredients([]);
        setPeanutsMenuAmount('');
      } else {
        setIsQuestionOneVisible(false);
      }
      if (value === 'no') {
        onNext(5, 'peanuts', calculateScore(value));
        setProgress(100);
      }
      if (value === 'yes') {
        setIsQuestionOneVisible(false);
        setIsQuestionThreeRequestVisible(false);
      }
    }
    updateProgress();
  };


  // USER CLICKED YES FOR QUESTION 1
  // YES -> ANSWERED QUESTION 2
  const handleYesAnsweredQuestion2 = (value) => {
    setPeanutsMenuAmount(value);
    setIsQuestionThreeRequestVisible(true);
    setIsQuestionTwoAmountVisible(false);
    updateProgress();
  };

  // YES -> ANSWERED QUESTION 3 
  const handleYesAnsweredQuestion3 = (value) => {
    setIsQuestionThreeRequestVisible(value);
    onNext(5, 'peanuts', calculateScore(value));
    updateProgress();
  }


  // USER CLICKED UNSURE FOR QUESTION 1
  // UNSURE -> ANSERWED NO
  const handleUnsureAnsweredNo = (value) => {
    setIsPeanutsFree(value);
    onNext(5, 'peanuts', calculateScore(value));
    setProgress(100);
    updateProgress();
  };

  // UNSURE -> AMSWERED YES
  const handleUnsureAnsweredYes = (value) => {
    const newCheckedIngredients = checkedIngredients.includes(value)
      ? checkedIngredients.filter((item) => item !== value)
      : [...checkedIngredients, value];
    setCheckedIngredients(newCheckedIngredients);

    if (newCheckedIngredients.length > 0) {
      setPeanuts('yes');
      setIsQuestionTwoNotSure(false);
      setIsQuestionFourVisible(false);
      setIsQuestionThreeVisible(true);
    } else {
      setPeanuts('not-sure');
      setIsQuestionTwoYes(false);
      setIsQuestionTwoNotSure(true);
    }
    updateProgress();
  };

  // UNSURE -> ANSERWED QUESTION 3
  const handleUnsureAnsweredQuestion3 = (value) => {
    setIsQuestionThreeVisible(value);
    setIsQuestionFourVisible(true);
    setIsQuestionThreeAmountVisible(false);
    updateProgress();
  }

  // UNSURE -> ANSERWED QUESTION 4 
  const handleUnsureAnsweredQuestion4 = (value) => {
    setIsQuestionFourVisible(value);
    onNext(5, 'peanuts', calculateScore(value));
    setProgress(100);
    setIsQuestionThreeVisible(false);
    updateProgress();
  };

  const calculateScore = () => {
    let baseScore = 0;
    switch (peanutsMenuAmount) {
      case 'some':
        baseScore = 75;
        break;
      case 'half':
        baseScore = 50;
        break;
      case 'more than half':
        baseScore = 25;
        break;
      case 'all':
        baseScore = 0;
        break;
      default:
        baseScore = 0;
    }
  
    if (peanuts === 'yes') {
      switch (peanutsMenuAmount) {
        case 'some':
          return baseScore * (2 - 0.01 * baseScore);
        case 'half':
          return baseScore - (2 - 0.01 * baseScore);
        case 'more than half':
          return 25 * (1 + 0.01 * baseScore);
        case 'all':
          return 25 * (1 + 0.01 * baseScore);
        default:
          return baseScore;
      }
    } else if (peanuts === 'not-sure' && isQuestionThreeRequestVisible) {
      switch (peanutsMenuAmount) {
        case 'some':
          return baseScore * (1.87 - 0.01 * baseScore);
        case 'half':
          return baseScore * (1.87 - 0.01 * baseScore);
        case 'more than half':
          return 15 * (1 + 0.01 * baseScore);
        case 'all':
          return 15 * (1 + 0.01 * baseScore);
        default:
          return baseScore;
      }
    } else if (peanuts === 'no' || (peanuts === 'not-sure' && isPeanutsFree === 'no')) {
      return baseScore;
    }
  
    return baseScore;
  };  

  return (
    <div className="survey-section active">
      <ProgressBar progress={progress} />

      {/* USER CLICKS YES */}
      {isQuestionOneVisible && (
        <div className="hello">
          <h2 id="question">Question 1</h2>
          <form>
            <label className="title-text">Are peanuts present in your menu items?</label><br />
            <button type="button" className="top" onClick={() => handleQuestion1('yes')}>Yes</button>
            <button type="button" onClick={() => handleQuestion1('no')}>No</button>
            <button type="button" onClick={() => handleQuestion1('not-sure')}>Unsure</button><br /><br />
          </form>
        </div>
      )}

      {/* USER CLICKS YES - QUES.2 */}
      {isQuestionTwoAmountVisible && isQuestionTwoYes && (
        <div id="gluten-details">
          <h2 id="question">Question 2</h2>
          <label className="title-text">How much of the menu contains peanuts?</label><br />
          <button type="button" onClick={() => handleYesAnsweredQuestion2('some')}>Some</button>
          <button type="button" onClick={() => handleYesAnsweredQuestion2('half')}>Half</button>
          <button type="button" onClick={() => handleYesAnsweredQuestion2('more than half')}>More than half</button>
          <button type="button" onClick={() => handleYesAnsweredQuestion2('all')}>All</button><br /><br />
        </div>
      )}
      {/* USER CLICKS YES - QUES.3 */}
      {isQuestionThreeRequestVisible && (
          <div id="request-question">
            <h2 id="question">Question 3</h2>
            <label className="title-text">Can these items be made without peanuts upon request?</label><br />
            <button type="button" onClick={() => handleYesAnsweredQuestion3('yes')}>Yes</button>
            <button type="button" onClick={() => handleYesAnsweredQuestion3('some not all')}>Some not all</button>
            <button type="button" onClick={() => handleYesAnsweredQuestion3('no')}>No</button><br /><br />
          </div>
        )}

        {/* USER CLICKS UNSURE - QUES.2 */}
        {isQuestionTwoNotSure &&(
          <div id="gluten-details">
            <h2 id="question">Question 2</h2>
            <label className="title-text">Does it contain any of the following?</label><br />
            <ul className="listy-list">
              <li>Peanut oil</li> 
              <li>Peanut butter</li>
            </ul>
            <button type="button" onClick={() => handleUnsureAnsweredYes('yes')}>Yes</button>
            <button type="button" onClick={() => handleUnsureAnsweredNo('no')}>No</button>
          </div>
        )}

        {/* USER CLICKS UNSURE - QUES.3 */}
        {isQuestionThreeVisible && isQuestionThreeAmountVisible && (
          <div id="gluten-details">
            <h2 id="question">Question 3</h2>
            <label className="title-text">How much of the menu contains peanuts?</label><br />
            <button type="button" onClick={() => handleUnsureAnsweredQuestion3('some')}>Some</button>
            <button type="button" onClick={() => handleUnsureAnsweredQuestion3('half')}>Half</button>
            <button type="button" onClick={() => handleUnsureAnsweredQuestion3('more than half')}>More than half</button>
            <button type="button" onClick={() => handleUnsureAnsweredQuestion3('all')}>All</button><br /><br />
          </div>
        )}

        {/* USER CLICKS UNSURE - QUES.4 */}
        {isQuestionFourVisible && (
        <div id="request-question">
          <h2 id="question">Question 4</h2>
          <label className="title-text">Can these items be made without peanuts upon request?</label><br />
          <button type="button" onClick={() => handleUnsureAnsweredQuestion4('yes')}>Yes</button>
          <button type="button" onClick={() => handleUnsureAnsweredQuestion4('some not all')}>Some not all</button>
          <button type="button" onClick={() => handleUnsureAnsweredQuestion4('no')}>No</button><br /><br />
        </div>
      )}

      {/* NEXT BUTTON */}
      {(peanuts === 'no' || (peanuts === 'yes' && peanutsMenuAmount) || (peanuts === 'not-sure' && isPeanutsFree === 'no')) && (peanuts === 'yes' && !isQuestionThreeRequestVisible) && (
        <button 
          className="button-category" 
          onClick={(e) => {
            e.preventDefault();
            onNext(5, 'peanuts', calculateScore());
            setProgress(100);
          }}
        >
          <img src={arrow} alt="arrow" />
        </button>
      )}
    </div>
  );
};

export default Category4;
