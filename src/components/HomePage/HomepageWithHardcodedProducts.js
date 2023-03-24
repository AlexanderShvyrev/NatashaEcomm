import React, { useState, useMemo, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
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
import ProductInfo from '../ProductInfo/ProductInfo';
import Favorites from '../Favorites/Favorites';

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
          (item.id === product.id && item.quantity < 10) ? { ...item, quantity: item.quantity + 1 } : item
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
                      <Link to="/favorites">Favorites</Link>
                    </li>
                    <li className='navbar-item'>
                      <Link to="/cart" className="cart-link">
                        <FaShoppingCart />
                        {count > 0 && (
                          <span className="cart-badge">{count}</span>
                        )}
                      </Link>
                    </li>
                  </ul>
                </nav>
                <Routes>
                  <Route exact path="/" element={<Products products={products} handleAddToCart={handleAddToCart} />} />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/cart" element={<Cart cartItems={cart} setCart={setCart} setCount={setCount} />} />
                  <Route exact path="/products/:id" element={<ProductInfo products={products} handleAddToCart={handleAddToCart} />} />
                  <Route exact path="/favorites" element={<Favorites handleAddToCart={handleAddToCart} />} />
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
