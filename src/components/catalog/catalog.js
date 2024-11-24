import React, { useState, useEffect } from "react";
import Chainsaws from "../chainsaws/chainsaws";
import Button from "../button/Button";
import useFetchChainsaws from "../../FetchChainsaw";

const Catalog = () => {
    const [visibleCount, setVisibleCount] = useState(4);
    const { chainsaws, loading, error } = useFetchChainsaws();

    const viewMore = () => {
        setVisibleCount(visibleCount + 4);
    }

    const hideCards = () => {
        setVisibleCount(4);
    };

    if (loading) {
        return <p className="load">Завантаження...</p>;
    }

    if (error) {
        return <p>Помилка: {error}</p>;
    }

    return (
        <div>
            <Chainsaws data={chainsaws.slice(0, visibleCount)} /> 
            {visibleCount < chainsaws.length && (
                <Button text="View more" className="view-btn" onClick={viewMore}/>
            )}
            {visibleCount >= chainsaws.length && (
                <Button text="Hide cards" className="view-btn" onClick={hideCards} />
            )}
        </div>
    );
};

export default Catalog;