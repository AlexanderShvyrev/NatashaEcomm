import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, handleRemoveFromCart }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Ooops! Looks like your cart is empty!</h2>
          <Link to="/" className="continue-shopping">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <h2>Your Cart</h2>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>
          <Link to="/" className="continue-shopping">
            Continue shopping
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;