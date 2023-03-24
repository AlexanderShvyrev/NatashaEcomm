import React, { useState, useContext } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import CountProvider from '../../context/CountProvider';
import CartProvider from '../../context/CartProvider';
import CountContext from '../../context/CountContext';
import './Cart.css';
import ButtonWithModal from '../Modal/ButtonWithModal';

const Cart = ({ cartItems, setCart, setCount }) => {
  const [items, setItems] = useState(cartItems);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [message, setMessage] = useState('');
  const { count } = useContext(CountContext);
  let addButton = document.querySelectorAll("add");


  //Această funcție este responsabilă pentru adăugarea cantității de produse în coș
  const handleAddQuantity = (product) => {
    if (product.quantity < 10) {
      let productToUpdate = items.find(item => item.id === product.id);
      let max = 10;
      let updatedItems;
      productToUpdate.quantity += 1;
      if (productToUpdate.quantity >= max) {
        setMessage("You've reached the limit of items that can be added at the same time");
        addButton.disabled = true;
        productToUpdate = 10;
        setUpdatedProduct(productToUpdate);
        updatedItems = items.map(item => {
          if (item.id === productToUpdate.id) {
            return {
              ...item,
              quantity: productToUpdate.quantity
            };
          }
          return item;
        });
        setItems(updatedItems);
      } else {
        addButton.disabled = false;
        setMessage("");
        setUpdatedProduct(productToUpdate);
        updatedItems = items.map(item => {
          if (item.id === productToUpdate.id) {
            return {
              ...item,
              quantity: productToUpdate.quantity
            };
          }
          return item;
        });
        setItems(updatedItems);
      };
    };
  };

  //Această funcție este responsabilă pentru scăderea cantității de produse din coș
  const handleSubstractQuantity = (product) => {
    let productToUpdate = items.find(item => item.id === product.id);
    if (productToUpdate.quantity > 1) {
      productToUpdate.quantity -= 1;
    } else {
      productToUpdate.quantity = 1;
    };
    setMessage("");
    addButton.disabled = false;
    setUpdatedProduct(productToUpdate);
    let updatedItems = items.map(item => {
      if (item.id === productToUpdate.id) {
        return {
          ...item,
          quantity: productToUpdate.quantity
        };
      }
      return item;
    });
    setItems(updatedItems);
  }

  //Calculează prețul total al tuturor produselor adăugate în coș
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  //Această funcție se ocupă de scoaterea produsului din coș
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
          <h3>Ooops! Looks like your cart is empty!</h3>
        </div>
      ) : (
          <CartProvider value={{ items, setCart }}>
            <CountProvider value={{ count, setCount }}>
              <h2>Your Cart</h2>
              {message}
              <ul className="cart-items">
                {items.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="add-buttons">
                      <AiOutlinePlusCircle id="add" onClick={() => handleAddQuantity(item)} />
                      <AiOutlineMinusCircle onClick={() => handleSubstractQuantity(item)} />
                    </div>
                    <img src={item.image} alt={item.title} />
                    <div className="cart-item-info-container">
                      <h3>{item.title}</h3>
                      <p className="cart-item-description">{item.description.substring(0, 80)}...</p>
                      <p>Quantity: {item.quantity > 0 ? item.quantity : 1}</p>
                      <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="trash-icon">
                      <button onClick={() => handleRemoveFromCart(item.id)}>
                        <span><FaTrash /></span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>
              <div className="buttons">
                <button className="continue-shopping">
                  <Link to="/">Continue shopping</Link>
                </button>
                <ButtonWithModal setCart={setCart} setCount={setCount} />
              </div>
            </CountProvider>
          </CartProvider>
        )
      }
    </div >
  );
};

export default Cart;
