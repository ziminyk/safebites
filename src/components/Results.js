import React, { useState, useEffect } from 'react';
import './styles.css';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Results = ({ score }) => {
  const { width, height } = useWindowSize();
  const [confettiActive, setConfettiActive] = useState(true);
  
  useEffect(() => {
    // Stop confetti after 10 seconds
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);
  
  const results = [
    { name: 'Gluten-free Friendly', score: score.gluten, threshold: 30 },
    { name: 'Dairy-free Friendly', score: score.dairy, threshold: 30 },
    { name: 'Nut-free Friendly', score: score.nuts, threshold: 30 },
    { name: 'Peanut-free Friendly', score: score.eggs, threshold: 30 },
    { name: 'Fish-free Friendly', score: score.fish, threshold: 30 },
    { name: 'Shellfish-free Friendly', score: score.shellfish, threshold: 30 },
    { name: 'Soy-free Friendly', score: score.soy, threshold: 30 },
    { name: 'Sesame-free Friendly', score: score.sesame, threshold: 30 },
    { name: 'Wheat-free Friendly', score: score.wheat, threshold: 30 },
    { name: 'Vegetarian Friendly', score: score.vegetarian, threshold: 30 },
    { name: 'Vegan Friendly', score: score.vegan, threshold: 30 },
    { name: 'Pescatarian Friendly', score: score.pescaterian, threshold: 30 },
    { name: 'No Beef Friendly', score: score.noBeef, threshold: 30 },
    { name: 'No Pork Friendly', score: score.noPork, threshold: 30 }
  ];

  
  return (
    <div className="results-page">
      {confettiActive && <Confetti width={width} height={height} recycle={false} />}
      <h1>Your Results</h1>
      <p>CONGRATULATIONS ON FINISHING THE SAFEBITES TEST!</p>
      <p>*20% may be cross contaminated</p>
      <ul className="results-list">
        {results.map((result, index) => (
          <li key={index} className={result.score >= result.threshold ? 'pass' : 'fail'}>
            <span className="result-name">{index + 1}. {result.name}</span>
            <span className="result-score">{result.score}%</span>
            <span className="result-status">{result.score >= result.threshold ? '✓' : '✕'}</span>
          </li>
        ))}
      </ul>
      <div className="suggestions">
        <h2>Suggestions for Your Restaurant</h2>
        <p>INCLUDE MORE MENU ITEMS THAT ARE:</p>
        <ul>
          <li>Soy-free ➜ Hemp seeds, Olive oil</li>
          <li>Wheat-free ➜ Buckwheat, Rice</li>
          <li>Vegetarian ➜ Tofu, Beans</li>
          <li>Vegan ➜ Tempeh, Tofu</li>
          <li>No Beef or Pork ➜ Chicken broth, Seafood</li>
        </ul>
      </div>
      <div className="navigation-buttons">
        <button onClick={() => window.history.back()}>Back</button>
        <button onClick={() => window.print()}>Print</button>
      </div>
    </div>
  );
};

export default Results;
