import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Cart from './Cart';
import { products } from '../utils/productArray'
import './HomepageWithHardcodedProducts.css';
import About from './About';
import Products from './Products';

const HomepageWithHardcodedProducts = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.title = cartItemsCount > 0 ? `(${cartItemsCount}) My Store` : 'My Store';
  }, [cart]);

  setTimeout(() => {
    setLoading(false)
  }, 1500);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container">
      {loading ? (
        <div className="center">
          <h1>Loading...</h1>
        </div>
      ) : (
          <Router>
            <nav className="navbar">
              <ul className='navbar-brand'>
                <li className='navbar-item'>
                  <Link to="/">Home</Link>
                </li>
                <li className='navbar-item'>
                  <Link to="/about">About</Link>
                </li>
                <li className='navbar-item'>
                  <Link to="/cart" className="cart-link">
                    &#128722;
                  {cartItemsCount > 0 && (
                      <span className="cart-badge">{cartItemsCount}</span>
                    )}
                  </Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route exact path="/" element={<Products products={products} handleAddToCart={handleAddToCart} />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart cartItems={cart} />} />
            </Routes>
          </Router>
        )
      }
    </div>
  );
};

export default HomepageWithHardcodedProducts;
