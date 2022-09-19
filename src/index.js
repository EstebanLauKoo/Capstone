import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from "react-router-dom";
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store/store";

import {CategoriesProvider} from "./context/categories.context";
import {CartProvider} from "./context/cart.context";


import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <CategoriesProvider>
                    <CartProvider>
                        <App/>
                    </CartProvider>
                </CategoriesProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);


