import React, { useState, useReducer } from 'react';

const CartContext = React.createContext({
    showCart: false,
    onOpenCart: () => { },
    onCloseCart: () => { },
    items: [],
    totalAmount: 0,
    onAddItem: item => { },
    onRemoveItem: id => { }
});

const defaultCart = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
        const itemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[itemIndex];
        let updatedItems;
        if (existingItem) {
            const updatedItem = { ...existingItem, amount: existingItem.amount + action.item.amount };
            updatedItems = [...state.items];
            updatedItems[itemIndex] = updatedItem;
        }
        else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }
    if (action.type === 'REMOVE') {
        const itemIndex = state.items.findIndex(item => item.id === action.id);
        const item = state.items[itemIndex];
        const updatedAmount = state.totalAmount - item.price;
        let updatedItems = [...state.items];
        if (item.amount - 1 === 0) {
            updatedItems.splice(itemIndex,1);
        }
        else {
            const updatedItem = { ...item, amount: item.amount - 1 };
            updatedItems[itemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }
    return defaultCart;
}

export const CartContextProvider = (props) => {

    const [showCart, setShowCart] = useState(false);
    const [cartState, dispatchCartUpdate] = useReducer(cartReducer, defaultCart);

    const onOpenCartHandler = () => {
        setShowCart(true);
    }

    const onCloseCartHandler = () => {
        setShowCart(false);
    }

    const addItemHandler = item => {
        dispatchCartUpdate({ type: 'ADD', item: item });
    }

    const removeItemHandler = id => {
        dispatchCartUpdate({ type: 'REMOVE', id: id });
    }

    return (<CartContext.Provider value={{
        showCart: showCart,
        onOpenCart: onOpenCartHandler,
        onCloseCart: onCloseCartHandler,
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        onAddItem: addItemHandler,
        onRemoveItem: removeItemHandler
    }}>
        {props.children}
    </CartContext.Provider>)
}

export default CartContext;