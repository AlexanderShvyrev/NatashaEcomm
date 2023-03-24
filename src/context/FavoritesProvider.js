import { useState } from 'react';
import FavoritesContext from './FavoritesContext';

const FavoritesProvider = (props) => {
    const [favorites, setFavorites] = useState([]);

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorites }}>
            {props.children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesProvider;