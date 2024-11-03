import React from "react";
import imgChainsaw from "../img/chainsaw2.jpg";

const HomePage = () => {
    return (
        <main className="home">
            <img className="home-img" src={imgChainsaw}/>
            <div className="home-description">
                <h1 className="title">STIHL</h1>
                <p className="description">Якість, надійність, інновації – ось що характеризує продукцію Stihl. 
                    Наш магазин пропонує широкий асортимент бензопил, які стануть надійними помічниками в будь-яких 
                    умовах: від догляду за садом до великих лісозаготівель.</p>
            </div>
        </main>
    )
}

export default HomePage;