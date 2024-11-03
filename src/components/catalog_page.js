import React from "react";
import Navigation from "./navigation";
import Filter from "./filter";
import Footer from "./footer";
import Chainsaws from "./chainsaws";

function CatalogPage() {
    return(<div>
        <Navigation />
        <Filter />
        <Chainsaws />
        <Footer />
    </div>)
}

export default CatalogPage;