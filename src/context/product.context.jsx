import {createContext, useState, useEffect} from "react";
import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext( {
products: []
})

export const ProductProvider = ({children}) => {

    const [products, SetProducts] = useState(PRODUCTS);
    const value = {products, SetProducts};

    return  <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>

}