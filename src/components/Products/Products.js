import React, { useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import FavoritesContext from '../../context/FavoritesContext';
import FavoritesProvider from '../../context/FavoritesProvider';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = ({ products, handleAddToCart }) => {
    const { favorites, setFavorites } = useContext(FavoritesContext);

    //Se ocupă de adăugarea la favorite atunci când s-a făcut clic pe pictograma inimii
    const handleAddToFavorites = (product) => {
        setFavorites([...favorites, product]);
        product.isFavorite = true;
    };
    return (
        <FavoritesProvider value={{ favorites, setFavorites }}>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <Link
                            to={`/products/${product.id}`}
                        >
                            <img className="product-image" src={product.image} alt={product.title} />
                        </Link>
                        <h2 className="product-title">{product.title}</h2>
                        <p className="product-info">{product.description.substring(0, 80)}...</p>
                        <p className="product-info">${product.price}<span> + shipping</span></p>
                        <button className="product-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        {product.isFavorite === false ? (
                            <button className="favorites-button" onClick={() => handleAddToFavorites(product)}><FaHeart /></button>
                        ) : (
                                <span className="favorited">Added to your favorites</span>
                            )}
                    </div>
                ))
                }
            </div>
        </FavoritesProvider>
    );
};

export default Products;