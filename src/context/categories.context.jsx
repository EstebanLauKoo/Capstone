import {createContext, useState, useEffect} from "react";
import SHOP_DATA from '../shop-data.js';
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext( {
    categoriesMap: {},
})

export const CategoriesProvider = ({children}) => {

    const [categoriesMap, setCategoriesMap] = useState([]);

    // this is used to load the initial test data
/*    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA);
    })*/

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap()
    }, [])

    const value = {categoriesMap, setCategoriesMap};

    return  <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>

}