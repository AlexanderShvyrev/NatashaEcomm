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
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-item">My Ecommerce Site</span>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <a href="#cart" className="cart-link">
              <i className="fa fa-shopping-cart fa-lg"></i>
              <span className="cart-badge">{cartCount}</span>
            </a>
          </div>
        </div>
      </nav>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>${product.price.toFixed(2)}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <Cart
        cartItems={cartItems}
        handleRemoveFromCart={handleRemoveFromCart}
      />
    </div>
  );
};

export default HomepageWithHardcodedProducts;
