import React from "react";
import Home from "./components/home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CatalogPage from "./components/catalog_page";

function App() {
    return(<BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/catalog" element={<CatalogPage />}/>
    </Routes>
    </BrowserRouter>
    )
}

export default App;
