import React, { useEffect, useState } from "react";
import { FaHeart, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../css/products.css';


export default function Products({ cat, products, filters }) {


    const [filterProducts, setfilterProducts] = useState([])



    useEffect(() => {
        cat && setfilterProducts(
            products.filter(item => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
        )
    }, [products, cat, filters])
    return (
        <>
            <div className="products">
                {filterProducts.map((a) => {
                    return (
                        <div key={a._id}>
                            <div className="productsimage">
                                <div className="icons11"><Link to={`/product/${a._id}`}><FaSearch className="icon1" /></Link></div>
                                <img className="productsimagesize" src={`/${a.image}`} alt="category" />
                            </div>
                        </div>

                    )
                })}
            </div>
        </>
    )
}