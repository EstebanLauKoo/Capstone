import {createContext, useState, useEffect} from "react";

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )

    // if found, increment quantity
    if  (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            {...cartItem, quantity : cartItem.quantity + 1}
            : cartItem
        )
    }


    // returns an array with modified cardItems/ new cart item
    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const subtractCartItem = (cartItems, productToSubtract) => {


    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToSubtract.id
    )

    // if found, check if quantity is 1 and then delete
    if  (existingCartItem.quantity === 1) {
        return (
            cartItems.filter(cartItem => cartItem.id != productToSubtract.id)
        )
    }

    return cartItems.map((cartItem) =>
        cartItem.id === productToSubtract.id
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
    )
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id != cartItemToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    subtractItemFromCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
        );
        setCartTotal(newCartTotal);
    }, [cartItems]);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {

        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const subtractItemFromCart = (productToSubtract) => {

        setCartItems(subtractCartItem(cartItems, productToSubtract))
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        subtractItemFromCart,
        removeItemFromCart,
        cartCount,
        cartTotal
    };

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}