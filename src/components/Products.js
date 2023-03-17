import React from 'react';
import './Products.css';

const Products = ({ products, handleAddToCart }) => {

    return (
        <div className="products-grid">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img className="product-image" src={product.image} alt={product.title} />
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-info">{product.description}</p>
                    <p className="product-info">${product.price}</p>
                    <button className="product-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default Products;