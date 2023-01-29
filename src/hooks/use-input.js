import { useState } from 'react';

const useInput =  validateValue => {

    const [inputValue, setInputValue] = useState('');
    const [inputIsTouched, setInputIsTouched] = useState(false);
    const valueIsValid = validateValue(inputValue);
    const inputIsInvalid = !valueIsValid && inputIsTouched;

    const valueChangeHandler = event => {
        setInputValue(event.target.value);
    }

    const inputBlurHandler = () => {
        setInputIsTouched(true);
    }

    const resetInput = () => {
        console.log(inputValue);
        setInputValue('');
        setInputIsTouched(false);

    }
    
    return {
        inputValue,
        valueIsValid,
        valueChangeHandler,
        inputBlurHandler,
        inputIsInvalid,
        resetInput
    };
}
 
export default useInput;