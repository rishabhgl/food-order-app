import styles from './Cart.module.css';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const Cart = () => {

    const context = useContext(CartContext);

    const removeHandler = id => { 
        context.onRemoveItem(id);
    };
    const addHandler = item => { 
        context.onAddItem({...item,amount:1});
    };

    const CartItems = context.items.map(item => {
        return (
            <CartItem name={item.name} key={item.id} amount={item.amount} price={item.price} onAdd={addHandler.bind(null,item)} onRemove={removeHandler.bind(null,item.id)} />
        );
    });

    const totalAmount = `$${context.totalAmount.toFixed(2)}`;
    const showOrder = context.items.length > 0;

    return (<Modal>
        <div className={styles['cart-items']}>
            <ul>
                {CartItems}
            </ul>
        </div>
        <div className={styles.total}>
            <span>Total:</span>
            <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={context.onCloseCart}>Close</button>
            {showOrder && <button className={styles.button}>Order</button>}
        </div>
    </Modal>);
}

export default Cart;