import React from 'react';
import './styles.css';

const LanguageSelector = ({ language, setLanguage }) => {
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="language-selector">
      <select value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Español</option>
        {/* Add other languages as needed */}
      </select>
    </div>
  );
};

export default LanguageSelector;