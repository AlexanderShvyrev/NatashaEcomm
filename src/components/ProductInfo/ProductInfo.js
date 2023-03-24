import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProductInfo.css'

const ProductInfo = ({ products, handleAddToCart }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const splitUrl = location.pathname.split('/');
    const id = parseInt(splitUrl[2]);
    const product = products.find((product) => product.id === id);

    const handleGoingBack = () => {
        navigate("/favorites");
    };

    return (
        <div className="p-container">
            <img className="image" src={product.image} alt={product.title} />
            <div className="product">
                <h2 className="p-title">{product.title}</h2>
                <h2 className="p-price">${product.price}</h2>
                <p className="desc">{product.description}</p>
                <div className="btns">
                    <button className="control-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    <button className="control-button" onClick={handleGoingBack}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;