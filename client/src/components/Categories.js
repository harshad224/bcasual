import React from "react";
import { Link } from "react-router-dom";
import '../css/categories.css';
import { categoryitem } from "./categoryitem";

export default function Categories() {
    return (
        <>
            <div className="categories">Categories</div>
            <div className="category">
                {categoryitem.map(a => {
                    return (
                        <Link to={`/products/${a.cat}`} >
                            <div className="cat">
                                <div className="information123">
                                    <h1 className="title">{a.title}</h1>
                                    <button className="shop">SHOP NOW</button>
                                </div>
                                <div>
                                    <img className="catsize" src={a.image} alt="catsize" />
                                </div>

                            </div>
                        </Link>
                    )
                })
                }

            </div >
            <div className="latestproducts">Latest Products</div>
        </>
    )
}