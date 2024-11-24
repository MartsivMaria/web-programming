import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Button from "../button/Button";
import { Select } from 'antd';
import useFetchChainsaws from "../../FetchChainsaw";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/itemSlice";

function Item() {
    const { id } = useParams();
    const { chainsaws, loading, error} = useFetchChainsaws();
    const [selectedType, setSelectedType] = useState("Тип приводу");
    const [selectedPower, setSelectedPower] = useState("Потужність");
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const chainsaw = chainsaws.find(item => String(item._id) === id);

    const handleChangeType = (value) => {
        setSelectedType(value);
    }
    const handleChangePower = (value) => {
        setSelectedPower(value);
    }

    const handleViewMoreClick = (id) => {
        navigate(`/chainsaws/${id}`);
    };

    if (loading) {
        return <div className="load">Завантаження...</div>;
    }
    if (error) {
        return <p>Помилка: {error}</p>;
    }

    const handleAdd = () => {
        if ( chainsaw ) {
            dispatch(addItem({ ...chainsaw, type: selectedType, power: selectedPower, quantity: count}));
        }
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
                        <Select id="select" className="select" value={selectedType} onChange={handleChangeType} onCountChange={setCount}>
                            <Select.Option value="бензиновий">бензиновий</Select.Option>
                            <Select.Option value="акумуляторний">акумуляторний</Select.Option>
                            <Select.Option value="електричний">електричний</Select.Option>
                        </Select>
                    </div>
                    <div className="item-select">
                        <label className="label" htmlFor="select">Потужність</label>
                        <Select className="select" value={selectedPower} onChange={handleChangePower} onCountChange={setCount}>
                            <Select.Option value="4,95 кВт">4,95 кВт</Select.Option>
                            <Select.Option value="3,35 кВт">3,35 кВт</Select.Option>
                            <Select.Option value="2,65 кВт">2,65 кВт</Select.Option>
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
                <Link className="link" to="/cart">
                    <Button className="add-btn" text="Add to cart" onClick={handleAdd}/>
                </Link>
            </div>
        </div>
    </div>)
}

export default Item;