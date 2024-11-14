import React, { useState } from "react";
import Chainsaws from "./chainsaws";
import Button from "./Button";
import chainsaws from "./chainsaw_data";

const Catalog = () => {
    const [visibleCount, setVisibleCount] = useState(4);

    const viewMore = () => {
        setVisibleCount(visibleCount + 4);
    }
    const hideCards = () => {
        setVisibleCount(4);
    };

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