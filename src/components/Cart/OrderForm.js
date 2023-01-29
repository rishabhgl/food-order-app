import useInput from '../../hooks/use-input';

import styles from './OrderForm.module.css';
import Input from '../UI/Input';

const OrderForm = (props) => {

    const { inputValue: enteredName, resetInput: resetName, valueChangeHandler: nameChangeHandler, inputBlurHandler: nameInputBlurHandler, inputIsInvalid: nameInputIsInvalid, valueIsValid: nameValueIsValid } = useInput(name => name.trim().length > 0);

    const { inputValue: enteredAddress, resetInput: resetAddress, valueChangeHandler: addressChangeHandler, inputBlurHandler: addressInputBlurHandler, inputIsInvalid: addressInputIsInvalid, valueIsValid: addressValueIsValid } = useInput(address => address.trim().length > 0);

    const formIsValid = nameValueIsValid && addressValueIsValid;

    const submitHandler = event => {
        event.preventDefault();

        if (!nameValueIsValid || !addressValueIsValid)
        {
            return;
        }

        const user = {
            name: enteredName,
            address: enteredAddress
        };
        resetAddress();
        resetName();
        props.onPlaceOrder(user);
        
    }

    return (<form className={styles.form} onSubmit = {submitHandler}>
        <div className={`${styles.control} ${nameInputIsInvalid ? styles.invalid : ''}`}>
            <Input label="Name" input={{
                id: "name",
                type: "text",
                value: enteredName,
                onChange: nameChangeHandler,
                onBlur: nameInputBlurHandler
            }} />
            {nameInputIsInvalid && <div className= {styles['error-text']}>Name must not be empty.</div>}
        </div>
        <div className={`${styles.control} ${addressInputIsInvalid ? styles.invalid : ''}`}>
            <Input label="Address" input={{
                id: "address",
                type: "text",
                value: enteredAddress,
                onChange: addressChangeHandler,
                onBlur: addressInputBlurHandler
            }} />
            {addressInputIsInvalid && <div className= {styles['error-text']}>Address must not be empty.</div>}
        </div>
        <div className={styles.actions}>
            <button type="button" onClick = {props.onCancel}> Cancel </button>
            <button type="submit" disabled = {!formIsValid} className = {styles.submit}> Place Order</button>
        </div>
    </form>);
}

export default OrderForm;