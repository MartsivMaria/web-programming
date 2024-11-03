import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoSearch } from "react-icons/go";

const Navigation = () => {
    const location = useLocation();
    return (
        <nav className="navigation">
            <h1 className="nav-title">TimberPro</h1>
            <ul>
                <li>
                    <Link className="link" to="/">Home</Link>
                </li>
                <li>
                    <Link className="link" to="/catalog">Catalog</Link>
                </li>
                <li>Cart</li>
            </ul>
            {location.pathname === '/catalog' && (
            <div className="search-container">
                <input className="nav-input" type="text" />
                <GoSearch className="icons-search" />
            </div>
)}
        </nav>
    )
}

export default Navigation;