import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoritesContext from '../../context/FavoritesContext';
import FavoritesProvider from '../../context/FavoritesProvider';
import './Favorites.css';

const Favorites = ({ handleAddToCart }) => {
    const { favorites, setFavorites } = useContext(FavoritesContext);

    return (
        <FavoritesProvider value={{ favorites, setFavorites }}>
            <div className="fav-card">
                {favorites.length > 0 ? favorites.map((item) => (
                    <div key={item.id} className="info-item-container">
                        <Link to={`/products/${item.id}`}>
                            <img className="item-image" src={item.image} alt={item.title} />
                        </Link>
                        <h3 className="item-title">{item.title}</h3>
                        <p className="item-info">{item.description.substring(0, 80)}...</p>
                        <p className="item-info-price">${item.price} + shipping</p>
                        <button className="item-button" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    </div>
                )) : (
                        <div className="list-empty">
                            <h3>Your favorites list is empty</h3>
                        </div>
                    )}
            </div>
        </FavoritesProvider>
    );
};

export default Favorites;