import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {

    const price = `$${props.price.toFixed(2)}`;
    const ctx = useContext(CartContext);

    const addItemHandler = amount => {
        const item = {
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount
        }
        ctx.onAddItem(item);

    }
    return (<li className={styles.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={styles.description}> {props.description}</div>
            <div className={styles.price}> {price}</div>
        </div>
        <MealItemForm id = {props.id} onAddItem = {addItemHandler}/>
    </li>);
}

export default MealItem;