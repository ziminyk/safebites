import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './styles.css';
import arrow from '../images/arrow.svg';


const Category8 = ({ onNext }) => {
  const [sesame, setSesame] = useState('');
  const [isQuestionTwoYes, setIsQuestionTwoYes] = useState(false);
  const [isQuestionTwoNotSure, setIsQuestionTwoNotSure] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [sesameMenuAmount, setSesameMenuAmount] = useState('');
  const [isSesameFree, setIsSesameFree] = useState('');
  const [isQuestionOneVisible, setIsQuestionOneVisible] = useState(true);
  const [isQuestionThreeVisible, setIsQuestionThreeVisible] = useState(false);
  const [isQuestionFourVisible, setIsQuestionFourVisible] = useState(false);
  const [isQuestionThreeAmountVisible, setIsQuestionThreeAmountVisible] = useState(true);
  const [isQuestionThreeRequestVisible, setIsQuestionThreeRequestVisible] = useState(false);
  const [isQuestionTwoAmountVisible, setIsQuestionTwoAmountVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    let progressValue = 0;
    if (sesame) progressValue += 20;
    if (isQuestionTwoYes || isQuestionTwoNotSure) progressValue += 20;
    if (sesameMenuAmount) progressValue += 20;
    if (isQuestionThreeRequestVisible || isQuestionFourVisible) progressValue += 20;
    if (sesame === 'no' || (sesame === 'yes' && sesameMenuAmount) || (sesame === 'not-sure' && isSesameFree === 'no')) progressValue += 20;
    console.log('Updated Progress:', progressValue);
    setProgress(progressValue);
  }

  // QUESTION 1 (YES/NO/UNSURE)
  const handleQuestion1 = (value) => {
    if (sesame === value) {
      setSesame('');
      setIsQuestionTwoYes(false);
      setIsQuestionTwoNotSure(false);
      setCheckedIngredients([]);
      setSesameMenuAmount('');
      setIsSesameFree('');
      setIsQuestionOneVisible(true);
      setIsQuestionThreeVisible(false);
      setIsQuestionFourVisible(false);
      setIsQuestionThreeAmountVisible(false);
      setIsQuestionThreeRequestVisible(false);
      setIsQuestionTwoAmountVisible(true);
      setProgress(0);
    } else {
      setSesame(value);
      setIsQuestionTwoYes(value === 'yes');
      setIsQuestionTwoNotSure(value === 'not-sure');
      if (value !== 'not-sure') {
        setCheckedIngredients([]);
        setSesameMenuAmount('');
      } else {
        setIsQuestionOneVisible(false);
      }
      if (value === 'no') {
        onNext(9, 'sesame', calculateScore(value));
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
    setSesameMenuAmount(value);
    setIsQuestionThreeRequestVisible(true);
    setIsQuestionTwoAmountVisible(false);
    updateProgress();
  };

  // YES -> ANSWERED QUESTION 3 
  const handleYesAnsweredQuestion3 = (value) => {
    setIsQuestionThreeRequestVisible(value);
    onNext(9, 'sesame', calculateScore(value));
    updateProgress();
  }


  // USER CLICKED UNSURE FOR QUESTION 1
  // UNSURE -> ANSERWED NO
  const handleUnsureAnsweredNo = (value) => {
    setIsSesameFree(value);
    onNext(9, 'sesame', calculateScore(value));
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
      setSesame('yes');
      setIsQuestionTwoNotSure(false);
      setIsQuestionFourVisible(false);
      setIsQuestionThreeVisible(true);
    } else {
      setSesame('not-sure');
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
    onNext(9, 'sesame', calculateScore(value));
    setProgress(100);
    setIsQuestionThreeVisible(false);
    updateProgress();
  };

  const calculateScore = () => {
    let baseScore = 0;
    switch (sesameMenuAmount) {
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
  
    if (sesame === 'yes') {
      switch (sesameMenuAmount) {
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
    } else if (sesame === 'not-sure' && isQuestionThreeRequestVisible) {
      switch (sesameMenuAmount) {
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
    } else if (sesame === 'no' || (sesame === 'not-sure' && isSesameFree === 'no')) {
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
            <label className="title-text">Is sesame present in your menu items?</label><br />
            <div className='options'>
              <button className="top" type="button" onClick={() => handleQuestion1('yes')}>Yes</button>
            </div>
            <button className="options" type="button" onClick={() => handleQuestion1('no')}>No</button>
            <button className="options" type="button" onClick={() => handleQuestion1('not-sure')}>Unsure</button><br /><br />
          </form>
        </div>
      )}

      {/* USER CLICKS YES - QUES.2 */}
      {isQuestionTwoAmountVisible && isQuestionTwoYes && (
        <div id="gluten-details">
          <h2 id="question">Question 2</h2>
          <label className="title-text">How much of the menu contains sesame?</label><br />
          <button className="options" type="button" onClick={() => handleYesAnsweredQuestion2('some')}>Some</button>
          <button className="options" type="button" onClick={() => handleYesAnsweredQuestion2('half')}>Half</button>
          <button className="options" type="button" onClick={() => handleYesAnsweredQuestion2('more than half')}>More than half</button>
          <button className="options" type="button" onClick={() => handleYesAnsweredQuestion2('all')}>All</button><br /><br />
        </div>
      )}
      {/* USER CLICKS YES - QUES.3 */}
      {isQuestionThreeRequestVisible && (
          <div id="request-question">
            <h2 id="question">Question 3</h2>
            <label className="title-text">Can these items be made without sesame upon request?</label><br />
            <button className="options" type="button" onClick={() => handleYesAnsweredQuestion3('yes')}>Yes</button>
            <button className="options" type="button" onClick={() => handleYesAnsweredQuestion3('some not all')}>Some not all</button>
            <button className="options" type="button" onClick={() => handleYesAnsweredQuestion3('no')}>No</button><br /><br />
          </div>
        )}

        {/* USER CLICKS UNSURE - QUES.2 */}
        {isQuestionTwoNotSure &&(
          <div id="gluten-details">
            <h2 id="question">Question 2</h2>
            <label className="title-text">Does it contain any of the following?</label><br />
            <ul className="listy-list">
            <li>Benne, benniseed</li>
            <li>Gingelly, gingelly oil</li>
            <li>Gomasio (sesame salt)</li>
            <li>Halvah</li>
            <li>Sesame flour</li>
            <li>Sesame oil*</li>
            <li>Sesame paste</li>
            <li>Sesame salt</li>
            <li>Sesame seed</li>
            <li>Sesamol</li>
            <li>Sesamum indicum</li>
            <li>esemolina</li>
            <li>Sim sim</li>
            <li>Tahini, Tahina, Tehina</li>
            <li>Til</li>
            </ul>
            <button className="options" type="button" onClick={() => handleUnsureAnsweredYes('yes')}>Yes</button>
            <button className="options" type="button" onClick={() => handleUnsureAnsweredNo('no')}>No</button>
          </div>
        )}

        {/* USER CLICKS UNSURE - QUES.3 */}
        {isQuestionThreeVisible && isQuestionThreeAmountVisible && (
          <div id="gluten-details">
            <h2 id="question">Question 3</h2>
            <label className="title-text">How much of the menu contains sesame?</label><br />
            <button className="options" type="button" onClick={() => handleUnsureAnsweredQuestion3('some')}>Some</button>
            <button className="options" type="button" onClick={() => handleUnsureAnsweredQuestion3('half')}>Half</button>
            <button className="options" type="button" onClick={() => handleUnsureAnsweredQuestion3('more than half')}>More than half</button>
            <button className="options" type="button" onClick={() => handleUnsureAnsweredQuestion3('all')}>All</button><br /><br />
          </div>
        )}

        {/* USER CLICKS UNSURE - QUES.4 */}
        {isQuestionFourVisible && (
        <div id="request-question">
          <h2 id="question">Question 4</h2>
          <label className="title-text">Can these items be made without sesame upon request?</label><br />
          <button className="options" type="button" onClick={() => handleUnsureAnsweredQuestion4('yes')}>Yes</button>
          <button className="options" type="button" onClick={() => handleUnsureAnsweredQuestion4('some not all')}>Some not all</button>
          <button className="options" type="button" onClick={() => handleUnsureAnsweredQuestion4('no')}>No</button><br /><br />
        </div>
      )}

      {/* NEXT BUTTON */}
      {(sesame === 'no' || (sesame === 'yes' && sesameMenuAmount) || (sesame === 'not-sure' && isSesameFree === 'no')) && (sesame === 'yes' && !isQuestionThreeRequestVisible) && (
        <button 
          className="button-category" 
          onClick={(e) => {
            e.preventDefault();
            onNext(9, 'sesame', calculateScore());
            setProgress(100);
          }}
        >
          <img src={arrow} alt="arrow" />
        </button>
      )}
    </div>
  );
};

export default Category8;