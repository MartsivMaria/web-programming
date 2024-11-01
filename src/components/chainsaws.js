import React from "react";
import chainsawImg2 from "../img/chainsaw2.jpg";
import chainsawImg4 from "../img/chainsaw4.jpg";
import chainsawImg5 from "../img/chainsaw5.jpg";
import chainsawImg6 from "../img/chainsaw6.jpg";

const Chainsaws = () => {
    const chainsaws = [
        {
            id: 1,
            img: chainsawImg2,
            title: "Бензопила MS 212",
            description: "Для роботи в приватному секторі та саду",
            price: 4500
        },
        {
            id: 2,
            img: chainsawImg4,
            title: "Бензопила MS 194 T",
            description: "Бензопила для лісового господарства",
            price: 14000
        },
        {
            id: 3,
            img: chainsawImg5,
            title: "Бензопила MS 210",
            description: "Бензопила для приватного господарства",
            price: 10000
        },
        {
            id: 4,
            img: chainsawImg6,
            title: "Бензопила ланцюгова MS DSG-25H",
            description: "Бензопила для догляду за деревами на присадибних ділянках",
            price: 5199
        }
    ]
    return (
        <ul className="items-container">
            {chainsaws.map((chainsaw) => (
                <li className="chainsaw-container" key={chainsaw.id}>
                    <img className="chainsaw-img" src={chainsaw.img} />
                    <h1 className="title-chainsaw">{chainsaw.title}</h1>
                    <p className="description-chainsaw">{chainsaw.description}</p>
                    <p className="price-chainsaw">{`${chainsaw.price} грн`}</p>
                </li>
            ))}
        </ul>
    );
}

export default Chainsaws;