import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProductInfo.css'

const ProductInfo = ({ products, handleAddToCart }) => {
    const location = useLocation();
    const navigate = useNavigate();
    //Obținerea ID-ului produsului de la adresa URL
    const splitUrl = location.pathname.split('/');
    const id = location.pathname.indexOf('favorites') !== -1 ? parseInt(splitUrl[3]) : parseInt(splitUrl[2]);
    //găsirea id-ului de la url în matricea de produse
    const product = products.find((product) => product.id === id);

    //Manerele butonul din spate. Pagina navighează înapoi la Favorite dacă informațiile despre produs au fost deschise din pagina „Preferate”.
    const handleGoingBack = () => {
        location.pathname.indexOf('favorites') !== -1 ? navigate("/favorites") : navigate("/");
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