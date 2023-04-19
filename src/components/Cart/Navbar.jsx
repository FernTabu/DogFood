import React from 'react';
import "./index.css";

export const Navbar = ({ size, }) => {
  return (
        <div className="cart">
          <span>
            <i className="fas fa-cart-plus"></i>
          </span>
      <span className='header__bubble'>{size}</span>
        </div>
  )
}
