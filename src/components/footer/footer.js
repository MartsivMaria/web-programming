import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="footer-description">
                    <p className="logo">STIHL</p>
                    <p className="footer-txt">Get your perfect chainsaw and enjoy your work!</p>
                </div>
                <div className="footer-icons">
                    <FaFacebookF className="icons"/>
                    <FaInstagram className="icons"/>
                    <FaLinkedinIn className="icons"/>
                    <FaTwitter className="icons"/>
                </div>
            </div>
            <hr className="footer-hr"/>
            <p className="txt-p">©TimberPro all rights reserved</p>
        </footer>
    )
}

export default Footer;