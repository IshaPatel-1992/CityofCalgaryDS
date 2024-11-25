import React from 'react';
import './HeaderComponent.css';

const HeaderComponent = () => {
  return (
    <header className="header">
      <h1 className="header-title">Smart Communities Calgary</h1> 
      <nav className='header-menu'>
      <a className='menu-item' href="/">Home</a>     
      <a className='menu-item' href="/">About</a>
      <a className='menu-item' href="/">Map</a>
      <a className='menu-item' href="/">Contact</a>
      </nav>      
    </header>
  );
};

export default HeaderComponent;