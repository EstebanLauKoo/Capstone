import './checkout-item.styles'

import {useSelector, useDispatch} from "react-redux";

import {selectCartItems} from "../../store/cart/cart.selector";

import {addItemToCart, removeItemFromCart, subtractItemFromCart} from "../../store/cart/cart.action";

import {
    CheckoutItemContainer,
    ImageContainer,
    Arrow,
    BaseSpan,
    Quantity,
    Value, RemoveButton
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {

    const {name, quantity, imageUrl, price} = cartItem

    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)


    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const subtractItemHandler = () => dispatch(subtractItemFromCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img  src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick = {subtractItemHandler}>&#10094;</Arrow>
                <Value >{quantity}</Value >
                <Arrow onClick= {addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem