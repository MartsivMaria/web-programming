import React from "react";
import Navigation from "./components/navigation";
import Catalog from "./components/catalog";
import Home from "./components/home";
import Footer from "./components/footer";

function App() {
    return(<div>
        <Navigation />
        <Home />
        <Catalog />
        <Footer />
    </div>)
}

export default App;
