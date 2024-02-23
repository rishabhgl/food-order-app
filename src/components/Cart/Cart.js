import { Fragment, useContext, useState } from 'react';

import CartItem from './CartItem';
import Modal from '../UI/Modal';
import OrderForm from './OrderForm';
import CartContext from '../../store/cart-context';
import styles from './Cart.module.css';

const Cart = () => {

    const [showOrderForm, setShowOrderForm] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

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

    const placeOrderHandler = async customer => {
        setIsSending(true);
        setError(null);
        const order = {
            nameCustomer: customer.name,
            addressCustomer: customer.address,
            order: context.items
        };
        try {
            const response = await fetch('https://65d89c8fc96fbb24c1bbe9ec.mockapi.io/api/orders', {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Could not send order!');
            }
            context.clearCart();
            setSubmitted(true);
        } catch (err) {
            setShowOrderForm(false);
            setError(err.message || 'Something went wrong!');
        }
        setIsSending(false);
    }

    let content = <Fragment>
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
        {showOrderForm && <OrderForm onPlaceOrder={placeOrderHandler} onCancel={context.onCloseCart} />}
    </Fragment>

    if (isSending) {
        content = <p>Sending order, please wait..</p>
    }
    

    if (error)
    {
        content = <Fragment>
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
            <p>{error}</p>
        </div>}
        {showOrderForm && <OrderForm onPlaceOrder={placeOrderHandler} onCancel={context.onCloseCart} />}
    </Fragment>
    }

    if (submitted)
    {
        content = <div className={styles.actions}>
            <p>Submitted order successfully!</p>
            <button className={styles.button} onClick={context.onCloseCart}>Close</button>
            </div>
    }

    return (<Modal>
        {content}
    </Modal>);
}

export default Cart;