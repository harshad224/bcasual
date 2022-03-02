import React from "react";
import { FaEnvelope, FaLocationArrow, FaPhone } from "react-icons/fa";
import '../css/footer.css';

export default function Footer() {
    return (
        <div className="footer">
            <div className="sec">
                <h2>LAMA</h2>
                <p>There are many varieties of passage of Lorem ipsum available,but amjority had suffered alteration in some form,by injected humour,or randomised words which don't look even slightly believable</p>
            </div>
            <div className="sec1">
                <h6>Useful links</h6>
                <div className="liksss d-flex">
                    <div className="links">
                        <span>Home</span>
                        <span>Men fashion</span>
                        <span>Accessories</span>
                        <span>Order Tracking</span>
                        <span>Wishlist</span>
                    </div>
                    <div className="links link12">
                        <span>Cart</span>
                        <span>Women fashion</span>
                        <span>My Account</span>
                        <span>Wishlist</span>
                        <span>Terms</span>
                    </div>
                </div>
            </div>

            <div className="sec2">
                <h6>Contact</h6>
                <p><FaLocationArrow />622,Dixie Path,South Tobinchester 98336</p>
                <p><FaPhone />+123456789</p>
                <p><FaEnvelope />contact@abcd.com</p>
            </div>
        </div>
    )
}