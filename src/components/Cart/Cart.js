import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const Cart = () => {

    const context = useContext(CartContext);
    return ( <Modal>
        <div className={styles['cart-items']}> Sushi </div>
        <div className = {styles.total}>
            <span>Total:</span>
            <span>$29.32</span>
        </div>
        <div className= {styles.actions}>
            <button className= {styles['button--alt']} onClick = {context.onCloseCart}>Close</button>
            <button className= {styles.button}>Order</button>
        </div>
    </Modal> );
}
 
export default Cart;