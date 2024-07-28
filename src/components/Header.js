import React from 'react';
import './styles.css';
import lang from '../images/lang.png';
import logo from '../images/logo.png';

const Header = ({ onLogoClick }) => {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <img src={lang} alt="lang" className="lang" />
    </div>
  );
};

export default Header;