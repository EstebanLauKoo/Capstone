import {useContext} from "react";

import './product-card.styles'


import { CartContext } from "../../context/cart.context";
import {FooterStyledContainer, Name, Price, ProductCardStyledContainer} from "./product-card.styles";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

const ProductCard = ( {product} ) => {

    const { name, price, imageUrl } = product
    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product)


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