import { useState } from 'react';
import CartContext from './CartContext';

const CartProvider = (props) => {
    const [cart, setCart] = useState([]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;