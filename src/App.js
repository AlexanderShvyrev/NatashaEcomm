import HomepageWithHardcodedProducts from './components/HomePage/HomepageWithHardcodedProducts';
import CountProvider from './context/CountProvider';
import CartProvider from './context/CartProvider';
import FavoritesProvider from './context/FavoritesProvider';

function App() {
  return (
    <div className="App">
      <FavoritesProvider>
        <CartProvider>
          <CountProvider>
            <HomepageWithHardcodedProducts />
          </CountProvider>
        </CartProvider>
      </FavoritesProvider>
    </div>
  );
};

export default App;
