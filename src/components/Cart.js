import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import CountProvider from '../context/CountProvider';
import CartProvider from '../context/CartProvider';
import CountContext from '../context/CountContext';
import CartContext from '../context/CartContext';
import './Cart.css';
import ButtonWithModal from './ButtonWithModal';

const Cart = ({ cartItems, setCart, setCount }) => {
  const [items, setItems] = useState(cartItems);
  const { cart } = useContext(CartContext);
  const { count } = useContext(CountContext);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveFromCart = (productId) => {
    const updatedItems = items.filter((item) => item.id !== productId);
    setItems(updatedItems);
    setCart(updatedItems);
    setCount(updatedItems.length);
    if (!updatedItems || updatedItems.length < 1) {
      setItems([]);
      setCount(0);
      setCart([]);
    };
  };

  return (
    <div className="cart">
      {items.length === 0 ? (
        <div className="empty-cart">
          <h2>Ooops! Looks like your cart is empty!</h2>
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
                <Link to="/" className="continue">
                  Continue shopping
                    </Link>
              </button>
              <CartProvider value={{ cart, setCart }}>
                <CountProvider value={{ count, setCount }}>
                  <ButtonWithModal setCart={setCart} setCount={setCount} />
                </CountProvider>
              </CartProvider>
            </div>
          </>
        )}
    </div>
  );
};

export default Cart;
