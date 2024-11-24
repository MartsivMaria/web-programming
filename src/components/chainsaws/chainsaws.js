import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import useFetchChainsaws from "../../FetchChainsaw";

const Chainsaws = ({data, limit }) => {
    const { chainsaws, loading, error } = useFetchChainsaws(); 
    const navigate = useNavigate();
    const location = useLocation();

    const chainsawData = data || chainsaws

    const handleViewMoreClick = (id) => {
        navigate(`/chainsaws/${id}`);
    };

    const displayedData = limit ? chainsawData.slice(0, limit) : chainsawData;


    if (error) {
        return <p>Помилка: {error}</p>;
    }

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
                                <Button className="view-more-btn" text="View more" onClick={() => handleViewMoreClick(chainsaw._id)}/>
                            </>
                        )}
                    </li>
                ))
            ) : (
                <p className="txt-no-found"></p>
            )}
        </ul>
    );
};

export default Chainsaws;