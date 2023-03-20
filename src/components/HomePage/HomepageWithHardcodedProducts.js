import React, { useState, useMemo, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CountContext from '../../context/CountContext';
import CountProvider from '../../context/CountProvider';
import CartContext from '../../context/CartContext';
import CartProvider from '../../context/CartProvider';
import Cart from '../Cart/Cart';
import { products } from '../../utils/productArray'
import './HomepageWithHardcodedProducts.css';
import About from '../About/About';
import Products from '../Products/Products';
import PageLoading from '../PageLoading/PageLoading';

const HomepageWithHardcodedProducts = () => {
  const { cart, setCart } = useContext(CartContext);
  const { count, setCount } = useContext(CountContext);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    document.title = count > 0 ? `(${count}) My Store` : 'My Store';
  }, [count]);

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
      setCount(cart.length + 1);
    }
  };


  return (
    <CartProvider value={{ cart, setCart }}>
      <CountProvider value={{ count, setCount }}>
        <div className="container">
          {loading ? (
            <PageLoading />
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
                        {count > 0 && (
                          <span className="cart-badge">{count}</span>
                        )}
                      </Link>
                    </li>
                  </ul>
                </nav>
                <Routes>
                  <Route exact path="/" element={<Products products={products} handleAddToCart={handleAddToCart} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cart" element={<Cart cartItems={cart} setCart={setCart} setCount={setCount} />} />
                </Routes>
              </Router>
            )
          }
        </div>
      </CountProvider>
    </CartProvider>
  );
};

export default HomepageWithHardcodedProducts;
