

import './product-card.styles'


import {useDispatch, useSelector} from "react-redux";

import {selectCartItems} from "../../store/cart/cart.selector";
import {addItemToCart} from "../../store/cart/cart.action";

import {FooterStyledContainer, Name, Price, ProductCardStyledContainer} from "./product-card.styles";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

const ProductCard = ( {product} ) => {

    const { name, price, imageUrl } = product


    const dispatch = useDispatch()
    const cartItems= useSelector(selectCartItems);

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

    return (
        <ProductCardStyledContainer>
            <img src={imageUrl} alt={`${name}`} />
            <FooterStyledContainer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </FooterStyledContainer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </ProductCardStyledContainer>
    )

}

export default ProductCard;