import {createContext, useState, useReducer} from "react";

import {createAction} from '../utils/reducer/reducer.utils'

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

const subtractCartItem = (cartItems, productToSubtract) => {


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

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
}

const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`unhandled type ${type} in cartReducer`)

    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartCount: 0,
    cartTotal: 0,
    cartItems: [],

}

export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [{ cartCount, cartTotal, cartItems}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (cartItems) => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        )
        const newCartTotal = cartItems.reduce(
            (total,cartItem) => total + cartItem.quantity * cartItem.price,
            0
        )

        const payload = {
            cartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal,
        }

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    };


    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const subtractItemFromCart = (productToSubtract) => {

        const newCartItems = subtractCartItem(cartItems, productToSubtract)
        updateCartItemsReducer(newCartItems)

    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemsReducer(newCartItems)
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