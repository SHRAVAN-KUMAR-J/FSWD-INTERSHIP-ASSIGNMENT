import React from 'react';
import './Header.css';

const Header = ({ cartCount }) => {
  return (
    <header className="header">
      <div className="logo-section">
        <div className="logo-icon">
          <i className="fas fa-store"></i>
        </div>
        <div className="logo-text">
          <h1>ShopHub</h1>
          <p>Premium Products, Better Prices</p>
        </div>
      </div>
      <div className="cart-preview">
        <i className="fas fa-shopping-bag"></i>
        <span className="cart-count">{cartCount}</span>
        <span className="cart-text">Cart</span>
      </div>
    </header>
  );
};

export default Header;