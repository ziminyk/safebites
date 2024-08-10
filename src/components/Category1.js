import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import './styles.css';
import arrow from '../images/arrow.svg';


const Category1 = ({ onNext }) => {
  const [gluten, setGluten] = useState('');
  const [isQuestionTwoYes, setIsQuestionTwoYes] = useState(false);
  const [isQuestionTwoNotSure, setIsQuestionTwoNotSure] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [glutenMenuAmount, setGlutenMenuAmount] = useState('');
  const [isGlutenFree, setIsGlutenFree] = useState('');
  const [isQuestionOneVisible, setIsQuestionOneVisible] = useState(true);
  const [isQuestionThreeVisible, setIsQuestionThreeVisible] = useState(false);
  const [isQuestionFourVisible, setIsQuestionFourVisible] = useState(false);
  const [isQuestionThreeAmountVisible, setIsQuestionThreeAmountVisible] = useState(true);
  const [isQuestionThreeRequestVisible, setIsQuestionThreeRequestVisible] = useState(false);
  const [isQuestionTwoAmountVisible, setIsQuestionTwoAmountVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const checkCompletion = () => {
    const complete = (gluten === 'no') ||
      (gluten === 'yes' && glutenMenuAmount && isQuestionThreeRequestVisible) ||
      (gluten === 'not-sure' && (isGlutenFree === 'no' || (checkedIngredients.length > 0 && glutenMenuAmount && isQuestionFourVisible)));
    setIsComplete(complete);
  };

  useEffect(() => {
    checkCompletion();
  }, [gluten, glutenMenuAmount, isQuestionThreeRequestVisible, isGlutenFree, checkedIngredients, isQuestionFourVisible]);


  const updateProgress = () => {
    let progressValue = 0;
    if (gluten) progressValue += 20;
    if (isQuestionTwoYes || isQuestionTwoNotSure) progressValue += 20;
    if (glutenMenuAmount) progressValue += 20;
    if (isQuestionThreeRequestVisible || isQuestionFourVisible) progressValue += 20;
    if (gluten === 'no' || (gluten === 'yes' && glutenMenuAmount) || (gluten === 'not-sure' && isGlutenFree === 'no')) progressValue += 20;
    console.log('Updated Progress:', progressValue);
    setProgress(progressValue);
    checkCompletion();
  }

  const handleBack = () => {
    if (isQuestionFourVisible) {
      setIsQuestionFourVisible(false);
      setIsQuestionThreeVisible(true);
      setIsQuestionThreeAmountVisible(true);
    } else if (isQuestionThreeRequestVisible) {
      setIsQuestionThreeRequestVisible(false);
      setIsQuestionTwoAmountVisible(true);
    } else if (isQuestionThreeVisible && isQuestionThreeAmountVisible) {
      setIsQuestionThreeVisible(false);
      setIsQuestionThreeAmountVisible(false);
      setIsQuestionTwoNotSure(true);
    } else if (isQuestionTwoAmountVisible && isQuestionTwoYes) {
      setIsQuestionTwoAmountVisible(false);
      setIsQuestionOneVisible(true);
    } else if (isQuestionTwoAmountVisible && isQuestionTwoNotSure) {
      setIsQuestionTwoNotSure(false);
      setIsQuestionTwoAmountVisible(false);
      setIsQuestionOneVisible(true);
    }
  };

  // QUESTION 1 (YES/NO/UNSURE)
  const handleQuestion1 = (value) => {
    // if (gluten === value) {
      // setGluten('');
      // setIsQuestionTwoYes(false);
      // setIsQuestionTwoNotSure(false);
      // setCheckedIngredients([]);
      // setGlutenMenuAmount('');
      // setIsGlutenFree('');
      // setIsQuestionOneVisible(true);
      // setIsQuestionThreeVisible(false);
      // setIsQuestionFourVisible(false);
      // setIsQuestionThreeAmountVisible(false);
      // setIsQuestionThreeRequestVisible(false);
      // setProgress(0);
      // setIsQuestionTwoAmountVisible(true);
    // } else {
      setGluten(value);
      setIsQuestionTwoYes(value === 'yes');
      setIsQuestionTwoNotSure(value === 'not-sure');
      if (value !== 'not-sure') {
        setCheckedIngredients([]);
        setGlutenMenuAmount('');
      } else {
        setIsQuestionOneVisible(false);
      }
      if (value === 'no') {
        onNext(2, 'gluten', calculateScore(value));
        setProgress(100);
      }
      if (value === 'yes') {
        setIsQuestionOneVisible(false);
        setIsQuestionThreeRequestVisible(false);
      }
    // }
    updateProgress();
  };


  // USER CLICKED YES FOR QUESTION 1
  // YES -> ANSWERED QUESTION 2
  const handleYesAnsweredQuestion2 = (value) => {
    setGlutenMenuAmount(value);
    setIsQuestionThreeRequestVisible(true);
    setIsQuestionTwoAmountVisible(false);
    updateProgress();
  };

  // YES -> ANSWERED QUESTION 3 
  const handleYesAnsweredQuestion3 = (value) => {
    setIsQuestionThreeRequestVisible(value);
    onNext(2, 'gluten', calculateScore(value));
    updateProgress();
  }


  // USER CLICKED UNSURE FOR QUESTION 1
  // UNSURE -> ANSERWED NO
  const handleUnsureAnsweredNo = (value) => {
    setIsGlutenFree(value);
    onNext(2, 'gluten', calculateScore(value));
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
      setGluten('yes');
      setIsQuestionTwoNotSure(false);
      setIsQuestionFourVisible(false);
      setIsQuestionThreeVisible(true);
    } else {
      setGluten('not-sure');
      setIsQuestionTwoYes(false);
      setIsQuestionTwoNotSure(true);
    }
    updateProgress();
  };

  // UNSURE -> ANSERWED QUESTION 3
  const handleUnsureAnsweredQuestion3 = (value) => {
    console.log(value)
    setGlutenMenuAmount(value);
    setIsQuestionThreeVisible(value);
    setIsQuestionFourVisible(true);
    setIsQuestionThreeAmountVisible(false);
    updateProgress();
  }

  // UNSURE -> ANSERWED QUESTION 4 
  const handleUnsureAnsweredQuestion4 = (value) => {
    setIsQuestionFourVisible(value);
    onNext(2, 'gluten', calculateScore(value));
    setProgress(100);
    setIsQuestionThreeVisible(false);
    updateProgress();
  };

  const calculateScore = () => {
    let baseScore = 0;
    switch (glutenMenuAmount) {
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
  
    if (gluten === 'yes') {
      switch (glutenMenuAmount) {
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
    } else if (gluten === 'not-sure' && isQuestionThreeRequestVisible) {
      switch (glutenMenuAmount) {
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
    } else if (gluten === 'no' || (gluten === 'not-sure' && isGlutenFree === 'no')) {
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
            <label className="title-text">Is gluten present in your menu items?</label><br />
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
          <label className="title-text">How much of the menu contains gluten?</label><br />
          <button type="button" onClick={() => handleYesAnsweredQuestion2('some')}>Some</button>
          <button type="button" onClick={() => handleYesAnsweredQuestion2('half')}>Half</button>
          <button type="button" onClick={() => handleYesAnsweredQuestion2('more than half')}>More than half</button>
          <button type="button" onClick={() => handleYesAnsweredQuestion2('all')}>All</button>
          <div className="navigation-buttons">
            <button type="button" onClick={handleBack}>Back</button>
          </div>
        </div>
      )}
      {/* USER CLICKS YES - QUES.3 */}
      {isQuestionThreeRequestVisible && (
          <div id="request-question">
            <h2 id="question">Question 3</h2>
            <label className="title-text">Can these items be made without gluten upon request?</label><br />
            <button type="button" onClick={() => handleYesAnsweredQuestion3('yes')}>Yes</button>
            <button type="button" onClick={() => handleYesAnsweredQuestion3('some not all')}>Some not all</button>
            <button type="button" onClick={() => handleYesAnsweredQuestion3('no')}>No</button>
            <div className="navigation-buttons">
              <button type="button" onClick={handleBack}>Back</button>
            </div>
          </div>
        )}

        {/* USER CLICKS UNSURE - QUES.2 */}
        {isQuestionTwoNotSure &&(
          <div id="gluten-details">
            <h2 id="question">Question 2</h2>
            <label className="title-text">Does it contain any of the following?</label><br />
            <ul className="listy-list">
              <li>Wheat</li>
              <li>Barley</li>
              <li>Rye</li>
              <li>Oats</li>
              <li>Spelt</li> 
              <li>Semolina</li> 
              <li>Millet</li> 
              <li>Buckwheat </li>
              <li>Couscous</li>
              <li>Kamut</li>
              <li>Commercial Salad Dressing </li>
              <li>Instant Coffee, Malted milk </li>
              <li>Canned stock, Soup</li>
              <li>White vinegar</li>
              <li>Beer</li> 
              <li>Ale</li>
              <li>made from grain alcohol </li>
              <li>Soy sauce</li>
              <li>Curry powders</li>
              <li>Dry seasoning</li>
              <li>gravy mixes</li>
              <li>Oil that was used for frying breaded foods </li>
              <li>Canned tuna (except tuna containing only water and salt) </li>
            </ul>
            <button type="button" onClick={() => handleUnsureAnsweredYes('yes')}>Yes</button>
            <button type="button" onClick={() => handleUnsureAnsweredNo('no')}>No</button>
            <div className="navigation-buttons">
              <button type="button" onClick={handleBack}>Back</button>
            </div>
          </div>
        )}

        {/* USER CLICKS UNSURE - QUES.3 */}
        {isQuestionThreeVisible && isQuestionThreeAmountVisible && (
          <div id="gluten-details">
            <h2 id="question">Question 3</h2>
            <label className="title-text">How much of the menu contains gluten?</label><br />
            <button type="button" onClick={() => handleUnsureAnsweredQuestion3('some')}>Some</button>
            <button type="button" onClick={() => handleUnsureAnsweredQuestion3('half')}>Half</button>
            <button type="button" onClick={() => handleUnsureAnsweredQuestion3('more than half')}>More than half</button>
            <button type="button" onClick={() => handleUnsureAnsweredQuestion3('all')}>All</button><br /><br />
            <div className="navigation-buttons">
              <button type="button" onClick={handleBack}>Back</button>
            </div>
          </div>
        )}

        {/* USER CLICKS UNSURE - QUES.4 */}
        {isQuestionFourVisible && (
        <div id="request-question">
          <h2 id="question">Question 4</h2>
          <label className="title-text">Can these items be made without gluten upon request?</label><br />
          <button type="button" onClick={() => handleUnsureAnsweredQuestion4('yes')}>Yes</button>
          <button type="button" onClick={() => handleUnsureAnsweredQuestion4('some not all')}>Some not all</button>
          <button type="button" onClick={() => handleUnsureAnsweredQuestion4('no')}>No</button><br /><br />
          <div className="navigation-buttons">
            <button type="button" onClick={handleBack}>Back</button>
          </div>
        </div>
      )}

      {/* NEXT BUTTON */}
      {isComplete && (
        <button 
          className="button-category" 
          onClick={(e) => {
            e.preventDefault();
            onNext(2, 'gluten', calculateScore());
            setProgress(100);
          }}
        >
          <img src={arrow} alt="arrow" />
        </button>
      )} */
    </div>
  );
};

export default Category1;
