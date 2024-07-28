import React, { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import Category1 from './components/Category1';
import Category2 from './components/Category2';
import Category3 from './components/Category3';
import Category4 from './components/Category4';
import Category5 from './components/Category5';
import Category6 from './components/Category6';
import Category7 from './components/Category7';
import Category8 from './components/Category8';
import Category9 from './components/Category9';
import Category10 from './components/Category10';
import Category11 from './components/Category11';
import Category12 from './components/Category12';
import Category13 from './components/Category13';
import Category14 from './components/Category14';
import Results from './components/Results';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './components/styles.css';
import Home from './components/Home';
import lang from './images/lang.png';
import logo from './images/logo.png'

const App = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState({
    gluten: 0,
    dairy: 0,
    nuts: 0,
    eggs: 0,
    fish: 0,
    shellfish: 0,
    soy: 0,
    sesame: 0,
    wheat: 0,
    vegetarian: 0,
    vegan: 0,
    pescaterian: 0,
    noBeef: 0,
    noPork: 0
  });

  const handleNext = (section, category, increment) => {
    setCurrentSection(section); 
    setProgress((section - 1) * 100 / 15);
    setScore(prevScore => ({
      ...prevScore,
      [category]: prevScore[category] + increment
    }));
  };

  const startSurvey = () => {
    setCurrentSection(1);
  };

  const handleLogoClick = () => {
    setCurrentSection(0);
  };

  return (
    <div className="app-container">
      {currentSection === 0 ? (
        <div className="homie">
          <div className="small">
            <img src={lang} alt="logo" className="lang" />
          </div>
          <div className="smallerig">
            <Home onStart={startSurvey} /> 
          </div>
        </div>
      ) : (
        <>
      <Header onLogoClick={handleLogoClick} />
      <div className="stuff">
        <Sidebar currentSection={currentSection} onNext={handleNext} />
        <div className="main-content">
          {currentSection === 1 && <Category1 onNext={handleNext} />}
          {currentSection === 2 && <Category2 onNext={handleNext} />}
          {currentSection === 3 && <Category3 onNext={handleNext} />}
          {currentSection === 4 && <Category4 onNext={handleNext} />}
          {currentSection === 5 && <Category5 onNext={handleNext} />}
          {currentSection === 6 && <Category6 onNext={handleNext} />}
          {currentSection === 7 && <Category7 onNext={handleNext} />}
          {currentSection === 8 && <Category8 onNext={handleNext} />}
          {currentSection === 9 && <Category9 onNext={handleNext} />}
          {currentSection === 10 && <Category10 onNext={handleNext} />}
          {currentSection === 11 && <Category11 onNext={handleNext} />}
          {currentSection === 12 && <Category12 onNext={handleNext} />}
          {currentSection === 13 && <Category13 onNext={handleNext} />}
          {currentSection === 14 && <Category14 onNext={handleNext} />}
          {currentSection === 15 && <Results score={score} />}
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default App;
