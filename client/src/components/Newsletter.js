import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import '../css/newsletter.css'

export default function Newsletter() {
    return (
        <div className="newsletter">
            <h1 className="newsletter1">Newsletter</h1>
            <h3>Get timely updates for your products</h3>
            <div className="inputemail">
                <input className="email" type="email" placeholder="Enter your email" />
                <button className="shop"><FaArrowCircleRight /></button>
            </div>

        </div>
    )
}