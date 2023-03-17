import React, { useState } from 'react';
import Cart from './Cart';
import { products } from '../utils/productArray'
import './HomepageWithHardcodedProducts.css';

const HomepageWithHardcodedProducts = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const cartCount = cartItems.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  return (
    <div className="homepage">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/cart" className="cart-link">
              Cart
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </a>
          </li>
        </ul>
      </nav>
      {window.location.pathname === "/" && (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
      {window.location.pathname === "/about" && (
        <div>
          <h1>About</h1>
          <p>Welcome to our store! We specialize in providing high-quality products at affordable prices.</p>
        </div>
      )}
      {window.location.pathname === "/cart" && (
        <Cart
          cartItems={cartItems}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      )}

    </div>
  );
};

export default HomepageWithHardcodedProducts;
