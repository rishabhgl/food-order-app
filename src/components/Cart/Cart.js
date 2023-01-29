import { useContext, useState } from 'react';

import CartItem from './CartItem';
import Modal from '../UI/Modal';
import OrderForm from './OrderForm';
import CartContext from '../../store/cart-context';
import styles from './Cart.module.css';

const Cart = () => {

    const [showOrderForm, setShowOrderForm] = useState(false);

    const context = useContext(CartContext);

    const removeHandler = id => {
        context.onRemoveItem(id);
    };
    const addHandler = item => {
        context.onAddItem({ ...item, amount: 1 });
    };

    const showFormHandler = () => {
        setShowOrderForm(true);
    }

    const CartItems = context.items.map(item => {
        return (
            <CartItem name={item.name} key={item.id} amount={item.amount} price={item.price} onAdd={addHandler.bind(null, item)} onRemove={removeHandler.bind(null, item.id)} />
        );
    });

    const totalAmount = `$${context.totalAmount.toFixed(2)}`;
    const showOrder = context.items.length > 0;

    const placeOrderHandler = customer => {
        const order = {
            nameCustomer: customer.name,
            addressCustomer: customer.address,
            order: context.items
        };
    }

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
        {!showOrderForm && <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={context.onCloseCart}>Close</button>
            {showOrder && <button className={styles.button} onClick={showFormHandler}>Order</button>}
        </div>}
        {showOrderForm && <OrderForm onPlaceOrder={placeOrderHandler} onCancel = {context.onCloseCart}/>}
    </Modal>);
}

export default Cart;