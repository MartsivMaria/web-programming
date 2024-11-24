import React from "react";
import { Link, useParams } from 'react-router-dom';
import Button from "./Button";
import { Select } from 'antd';
import useFetchChainsaws from "../FetchChainsaw";

function Item() {
    const { id } = useParams();
    const { chainsaws, loading, error} = useFetchChainsaws();

    const chainsaw = chainsaws.find(item => String(item._id) === id);

    if (loading) {
        return <div className="load">Завантаження...</div>;
    }
    if (error) {
        return <p>Помилка: {error}</p>;
    }

    return(<div>
        <div className="item-decriptions">
            <img className="item-img" src={chainsaw.img}/>
            <div>
                <h2>{chainsaw.title}</h2>
                <p className="item-description">{chainsaw.description}</p>
                <div className="item-selects">
                    <div className="item-select">
                        <label className="label" htmlFor="select">Тип приводу</label>
                        <Select id="select" className="select" value="select">
                            <Select.Option>бензиновий</Select.Option>
                            <Select.Option>акумуляторний</Select.Option>
                            <Select.Option>електричний</Select.Option>
                        </Select>
                    </div>
                    <div className="item-select">
                        <label className="label" htmlFor="select">Потужність</label>
                        <Select className="select" value="select">
                            <Select.Option>4,95 кВт</Select.Option>
                            <Select.Option>3,35 кВт</Select.Option>
                            <Select.Option>2,65 кВт</Select.Option>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
        <div className="item-nav">
            <p className="item-price">Price: {`${chainsaw.price} грн`}</p>
            <div>
                <Link className="link" to="/catalog">
                    <Button className="back-btn"  text="Go back"/>
                </Link>
                <Button className="add-btn" text="Add to cart"/>
            </div>
        </div>
    </div>)
}

export default Item;