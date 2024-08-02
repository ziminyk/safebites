import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './styles.css';
import arrow from '../images/arrow.svg';


const Category6 = ({ onNext }) => {
  const [shellfish, setShellfish] = useState('');
  const [isQuestionTwoYes, setIsQuestionTwoYes] = useState(false);
  const [isQuestionTwoNotSure, setIsQuestionTwoNotSure] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [shellfishMenuAmount, setShellfishMenuAmount] = useState('');
  const [isShellfishFree, setIsShellfishFree] = useState('');
  const [isQuestionOneVisible, setIsQuestionOneVisible] = useState(true);
  const [isQuestionThreeVisible, setIsQuestionThreeVisible] = useState(false);
  const [isQuestionFourVisible, setIsQuestionFourVisible] = useState(false);
  const [isQuestionThreeAmountVisible, setIsQuestionThreeAmountVisible] = useState(true);
  const [isQuestionThreeRequestVisible, setIsQuestionThreeRequestVisible] = useState(false);
  const [isQuestionTwoAmountVisible, setIsQuestionTwoAmountVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    let progressValue = 0;
    if (shellfish) progressValue += 20;
    if (isQuestionTwoYes || isQuestionTwoNotSure) progressValue += 20;
    if (shellfishMenuAmount) progressValue += 20;
    if (isQuestionThreeRequestVisible || isQuestionFourVisible) progressValue += 20;
    if (shellfish === 'no' || (shellfish === 'yes' && shellfishMenuAmount) || (shellfish === 'not-sure' && isShellfishFree === 'no')) progressValue += 20;
    console.log('Updated Progress:', progressValue);
    setProgress(progressValue);
  }

  // QUESTION 1 (YES/NO/UNSURE)
  const handleQuestion1 = (value) => {
    if (shellfish === value) {
      setShellfish('');
      setIsQuestionTwoYes(false);
      setIsQuestionTwoNotSure(false);
      setCheckedIngredients([]);
      setShellfishMenuAmount('');
      setIsShellfishFree('');
      setIsQuestionOneVisible(true);
      setIsQuestionThreeVisible(false);
      setIsQuestionFourVisible(false);
      setIsQuestionThreeAmountVisible(false);
      setIsQuestionThreeRequestVisible(false);
      setIsQuestionTwoAmountVisible(true);
      setProgress(0);
    } else {
      setShellfish(value);
      setIsQuestionTwoYes(value === 'yes');
      setIsQuestionTwoNotSure(value === 'not-sure');
      if (value !== 'not-sure') {
        setCheckedIngredients([]);
        setShellfishMenuAmount('');
      } else {
        setIsQuestionOneVisible(false);
      }
      if (value === 'no') {
        onNext(7, 'shellfish', calculateScore(value));
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
    setShellfishMenuAmount(value);
    setIsQuestionThreeRequestVisible(true);
    setIsQuestionTwoAmountVisible(false);
    updateProgress();
  };

  // YES -> ANSWERED QUESTION 3 
  const handleYesAnsweredQuestion3 = (value) => {
    setIsQuestionThreeRequestVisible(value);
    onNext(7, 'shellfish', calculateScore(value));
    updateProgress();
  }


  // USER CLICKED UNSURE FOR QUESTION 1
  // UNSURE -> ANSERWED NO
  const handleUnsureAnsweredNo = (value) => {
    setIsShellfishFree(value);
    onNext(7, 'shellfish', calculateScore(value));
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
      setShellfish('yes');
      setIsQuestionTwoNotSure(false);
      setIsQuestionFourVisible(false);
      setIsQuestionThreeVisible(true);
    } else {
      setShellfish('not-sure');
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
    onNext(7, 'shellfish', calculateScore(value));
    setProgress(100);
    setIsQuestionThreeVisible(false);
    updateProgress();
  };

  const calculateScore = () => {
    let baseScore = 0;
    switch (shellfishMenuAmount) {
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
  
    if (shellfish === 'yes') {
      switch (shellfishMenuAmount) {
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
    } else if (shellfish === 'not-sure' && isQuestionThreeRequestVisible) {
      switch (shellfishMenuAmount) {
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
    } else if (shellfish === 'no' || (shellfish === 'not-sure' && isShellfishFree === 'no')) {
      return baseScore;
    }
  
    return baseScore;
  };  

  return (
    <div className="survey-section active">
      {/* USER CLICKS YES */}
      {isQuestionOneVisible && (
        <div className="hello">
          <h2 id="question">Question 1</h2>
          <form>
            <label className="title-text">Is shellfish present in your menu items?</label><br />
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
          <label className="title-text">How much of the menu contains shellfish?</label><br />
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
            <label className="title-text">Can these items be made without shellfish upon request?</label><br />
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
              <li>Shrimp</li>
              <li>Prawns</li>
              <li>Crabs</li>
              <li>Lobsters</li>
              <li>Clams</li>
              <li>Mussels</li>
              <li>Oysters</li>
              <li>Scallops</li>
              <li>Octopus</li>
              <li>Squid</li>
              <li>Abalone</li>
              <li>Snail</li>
            </ul>
            <button type="button" onClick={() => handleUnsureAnsweredYes('yes')}>Yes</button>
            <button type="button" onClick={() => handleUnsureAnsweredNo('no')}>No</button>
          </div>
        )}

        {/* USER CLICKS UNSURE - QUES.3 */}
        {isQuestionThreeVisible && isQuestionThreeAmountVisible && (
          <div id="gluten-details">
            <h2 id="question">Question 3</h2>
            <label className="title-text">How much of the menu contains shellfish?</label><br />
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
          <label className="title-text">Can these items be made without shellfish upon request?</label><br />
          <button type="button" onClick={() => handleUnsureAnsweredQuestion4('yes')}>Yes</button>
          <button type="button" onClick={() => handleUnsureAnsweredQuestion4('some not all')}>Some not all</button>
          <button type="button" onClick={() => handleUnsureAnsweredQuestion4('no')}>No</button><br /><br />
        </div>
      )}

      {/* NEXT BUTTON */}
      {(shellfish === 'no' || (shellfish === 'yes' && shellfishMenuAmount) || (shellfish === 'not-sure' && isShellfishFree === 'no')) && (shellfish === 'yes' && !isQuestionThreeRequestVisible) && (
        <button 
          className="button-category" 
          onClick={(e) => {
            e.preventDefault();
            onNext(7, 'shellfish', calculateScore());
            setProgress(100);
          }}
        >
          <img src={arrow} alt="arrow" />
        </button>
      )}
    </div>
  );
};

export default Category6;
