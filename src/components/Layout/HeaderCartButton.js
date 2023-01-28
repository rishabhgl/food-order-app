import { useContext } from 'react';
import styles from './HeaderCartButton.module.css';
import CartIcon from './CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = () => {

    const context = useContext(CartContext);
    return ( <button className= {styles.button} onClick = {context.onOpenCart}>
        <span className= {styles.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className= {styles.badge}> 3 </span>
    </button> );
}
 
export default HeaderCartButton;