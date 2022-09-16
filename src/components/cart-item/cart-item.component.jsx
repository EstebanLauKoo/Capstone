import './cart-item.styles'
import {CartItemContainer, CartItemImage, ItemDetails, ItemName, ItemPrice} from "./cart-item.styles";


const CartItem = ({ cartItem }) => {
    const {name, quantity, imageUrl, price} = cartItem;
    return (
        <CartItemContainer>
            <CartItemImage src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <ItemName>{name}</ItemName>
                <ItemPrice>
          {quantity} x ${price}
                </ItemPrice>
            </ItemDetails>
        </CartItemContainer>
    )

}

export default CartItem;