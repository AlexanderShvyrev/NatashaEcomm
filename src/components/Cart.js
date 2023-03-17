import React, { useState } from 'react';
import './Cart.css';
import ButtonWithModal from './ButtonWithModal';

const Cart = ({ cartItems }) => {
  const [items, setItems] = useState(cartItems);

  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  const handleRemoveFromCart = (productId) => {
    const updatedItems = items.filter((item) => item.id !== productId);
    setItems(updatedItems);
  };

  return (
    <div className="cart">
      {items.length === 0 ? (
        <div className="empty-cart">
          <h2>Ooops! Looks like your cart is empty!</h2>
          <a href="/" className="continue-shopping">
            Continue shopping
          </a>
        </div>
      ) : (
          <>
            <h2>Your Cart</h2>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>Quantity: {item.quantity > 0 ? item.quantity : 1}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <button onClick={() => handleRemoveFromCart(item.id)}>
                      <span>&#128465;</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>
            <div className="buttons">
              <button className="continue-shopping">
                <a href="/">
                  Continue shopping
                </a>
              </button>
              <ButtonWithModal />
            </div>
          </>
        )}
    </div>
  );
};

export default Cart;
