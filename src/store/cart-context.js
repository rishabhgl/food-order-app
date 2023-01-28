import React,{ useState } from 'react';

const CartContext = React.createContext({
    showCart: false,
    onOpenCart: () => {},
    onCloseCart: () => {}
});

export const CartContextProvider = (props) => {

    const [showCart,setShowCart]  = useState(false);

    const onOpenCartHandler = () => {
        setShowCart(true);
    }

    const onCloseCartHandler = () => {
        setShowCart(false);
    }

    return(<CartContext.Provider value={{
        showCart: showCart,
        onOpenCart: onOpenCartHandler,
        onCloseCart: onCloseCartHandler
    }}>
        {props.children}
    </CartContext.Provider>)
}

export default CartContext;