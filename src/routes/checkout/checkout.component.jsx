import './checkout.styles'

import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from "./checkout.styles";


const Checkout = () => {


    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal)

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>Product</HeaderBlock>
                <HeaderBlock>Description</HeaderBlock>
                <HeaderBlock>Quantity</HeaderBlock>
                <HeaderBlock>Price</HeaderBlock>
                <HeaderBlock>Remove</HeaderBlock>
            </CheckoutHeader>
                    {cartItems.length ? (
                        cartItems.map((cartItem) => (
                            <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                        ))
                    ) : (
                        <span className='empty-message'>Your cart is empty</span>
                    )}
            <Total>Total: {cartTotal}</Total>
        </CheckoutContainer>
    )
}

export default Checkout;