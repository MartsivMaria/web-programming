import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import chainsaws from "./chainsaw_data";

const Chainsaws = ({ data=chainsaws, limit }) => {
    const location = useLocation();
    const displayedData = limit ? data.slice(0, limit) : data;

    return (
        <ul className="items-container">
            {displayedData.length > 0 ? (
                displayedData.map((chainsaw) => (
                    <li className="chainsaw-container" key={chainsaw.id}>
                        <img className="chainsaw-img" src={chainsaw.img} alt={chainsaw.title} />
                        <h1 className="title-chainsaw">{chainsaw.title}</h1>
                        <p className="description-chainsaw">{chainsaw.description}</p>
                        {location.pathname === '/catalog' && (
                            <>
                                <div className="price">
                                    <p className="txt-price">Price: </p>
                                    <p className="price-chainsaw">{`${chainsaw.price} грн`}</p>
                                </div>
                                <Link className="link" to={`/item-page/${chainsaw.id}`}>
                                    <Button className="view-more-btn" text="View more" />
                                </Link>
                            </>
                        )}
                    </li>
                ))
            ) : (
                <p className="txt-no-found">No chainsaws found</p>
            )}
        </ul>
    );
};

export default Chainsaws;