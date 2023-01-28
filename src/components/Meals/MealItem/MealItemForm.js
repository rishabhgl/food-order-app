import { Fragment, useRef, useState } from 'react';
import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {

    const inputRef = useRef();

    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = event => {
        event.preventDefault();

        const inputValue = inputRef.current.value;
        const enteredAmount = +inputValue;

        if(inputValue.trim().length === 0 || enteredAmount > 5 || enteredAmount < 1)
        {
            setAmountIsValid(false);
            return;
        }

        props.onAddItem(enteredAmount);
    }

    return ( <Fragment>
        <form className={styles.form} onSubmit = {submitHandler}>
            <Input ref = {inputRef} label = "Amount" input = {
                {
                    id: props.id,
                    type: "number",
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }
            }/>
            <button type = "submit"> + Add </button>
            {!amountIsValid && <p> Please enter a valid amount</p>}
        </form>
    </Fragment> );
}
 
export default MealItemForm;