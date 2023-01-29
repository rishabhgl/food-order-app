import { Fragment, useContext } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartContext from './store/cart-context';

function App() {

  const context = useContext(CartContext);
  
  return (
    <Fragment>
      {context.showCart && <Cart />}
      <Header />
      <Meals />
    </Fragment>
  );
}

export default App;
