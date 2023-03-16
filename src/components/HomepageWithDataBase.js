import { useState, useEffect } from "react";
import Cart from "./Cart";
import { database } from "./firebase";
import "./HomepageWithDataBase.css";

function HomepageWithDataBase() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const ref = database.ref("products");
    ref.once("value", (snapshot) => {
      const productsData = snapshot.val();
      const productsArray = Object.keys(productsData).map((key) => ({
        id: key,
        ...productsData[key],
      }));
      setProducts(productsArray);
    });
  }, []);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevState) => prevState.filter((item) => item.id !== id));
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
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
              <span className="cart-icon">&#128722;</span>
              {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
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
      {window.location.pathname === '/cart' && (
        <div>
            <Cart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
        </div>
      )}
    </div>
  );
}

export default HomepageWithDataBase;
