import HomepageWithHardcodedProducts from './components/HomepageWithHardcodedProducts';
import CountProvider from './context/CountProvider';
import CartProvider from './context/CartProvider';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <CountProvider>
          <HomepageWithHardcodedProducts />
        </CountProvider>
      </CartProvider>
    </div>
  );
};

export default App;
