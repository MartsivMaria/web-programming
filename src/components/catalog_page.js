import React, { useState } from "react";
import Navigation from "./navigation";
import Filter from "./filter";
import Footer from "./footer";
import Chainsaws from "./chainsaws";
import chainsaws from "./chainsaw_data";

function CatalogPage() {
    const [filteredData, setFilteredData] = useState(chainsaws.slice(0, 4));

    const handleSearch = (searchTerm) => {
        const filtered = chainsaws.filter(chainsaw =>
            chainsaw.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };
    const handleSort = (sortCriteria) => {
        let sortedChainsaws = [...filteredData];
        if (sortCriteria === "Name") {
            sortedChainsaws.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortCriteria === "Price") {
            sortedChainsaws.sort((a, b) => a.price - b.price);
        } else if (sortCriteria === "Power") {
            sortedChainsaws.sort((a, b) => (a.power || 0) - (b.power || 0));
        }
        setFilteredData(sortedChainsaws);
    };
    return(<div>
        <Navigation onSearch={handleSearch}/>
        <Filter onSort={handleSort} />
        <Chainsaws data={filteredData.slice(0, 4)} />
        <Footer />
    </div>)
}

export default CatalogPage;