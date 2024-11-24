import React from "react";
import Home from "./components/welcome_section/home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CatalogPage from "./components/catalog/catalog_page";
import ItemPage from "./components/item/item_page";
import CartPage from "./components/cart/cart_page";

function App() {
    return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/catalog" element={<CatalogPage />}/>
        <Route path="/chainsaws/:id" element={<ItemPage />}/>
        <Route path="/cart" element={<CartPage />}/>
    </Routes>
    </BrowserRouter>
    )
}

export default App;
