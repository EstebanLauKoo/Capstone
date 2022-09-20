import {CART_ACTION_TYPES} from "./cart.types";
import {createAction} from "../../utils/reducer/reducer.utils";

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

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const subtractItemFromCart = (cartItems, productToSubtract) => {

    const newCartItems = subtractCartItem(cartItems, productToSubtract)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const setIsCartOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);