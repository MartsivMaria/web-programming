import React from "react";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../redux/itemSlice";

const Cart = () => {
    const items = useSelector((state) => state.card.items);
    const dispatch = useDispatch()

    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleIncrement = ( id, type, power ) => {
        dispatch(incrementQuantity({ id, type, power }))
    };
    const handleDecrement = ( id, type, power ) => {
        dispatch(decrementQuantity({ id, type, power }))
    };

    return (<div>
            <h1 className="title-shopping-cart">Shopping Cart</h1>
        <div>
            {items.map((chainsaw) => (
                <div className="item-container" key={`${chainsaw._id}-${chainsaw.type}-${chainsaw.power}`}>
                    <img className="item-img" src={chainsaw.img}/>
                    <h2 className="item-title">{chainsaw.title}</h2>
                    <div className="item-element">
                        <div className="selected-item">
                            <p>Тип приводу: {chainsaw.type}</p>
                            <p>Потужність: {chainsaw.power}</p>
                        </div>
                        <div>
                            <Button className="btn-minus" text="-" onClick={() => handleDecrement(chainsaw._id, chainsaw.type, chainsaw.power)}/>
                            <span>{chainsaw.quantity}</span>
                            <Button className="btn-plus" text="+" onClick={() => handleIncrement(chainsaw._id,  chainsaw.type, chainsaw.power)}/>
                        </div>
                        <p className="item-price">{chainsaw.price * chainsaw.quantity} грн</p>
                    </div>
                </div>
            ))}
        </div>
        <div>
        <p className="txt-cart">Total amount: {totalAmount}</p>
        </div>
        <div className="buttons">
            <Link className="link" to="/catalog">
                <Button className="back-btn" text="Back to Catalog"/>
            </Link>
            <Link className="link" to="/checkout">
                <Button className="add-btn" text="Continue"/>
            </Link>
        </div>
    </div>)
}

export default Cart;