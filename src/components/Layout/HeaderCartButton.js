import { useContext } from 'react';
import styles from './HeaderCartButton.module.css';
import CartIcon from './CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = () => {

    const ctx = useContext(CartContext);
    const badgeNumber = ctx.items.reduce((currNum,item) => currNum + item.amount,0)
    return ( <button className= {styles.button} onClick = {ctx.onOpenCart}>
        <span className= {styles.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className= {styles.badge}> {badgeNumber} </span>
    </button> );
}
 
export default HeaderCartButton;