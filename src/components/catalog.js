import React from "react";
import Chainsaws from "./chainsaws";
import Button from "./Button";

const Catalog = () => {
    return (
        <div>
            <Chainsaws />
            <Button text="View more" className="view-btn" />
        </div>
    )
}

export default Catalog;