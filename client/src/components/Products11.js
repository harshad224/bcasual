import React, { useEffect, useState } from "react";
import { FaHeart, FaSearch, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/products.css';


export default function Products11() {

    const [prodetail, setProdetail] = useState([])

    useEffect(() => {
        const gethomepro = async () => {
            try {
                const gethome = await axios.get('/api/product/')

                setProdetail(gethome.data)
                console.log(gethome)
            } catch (err) {
                console.log(err)
            }
        }
        gethomepro()
    }, [])

    return (
        <>
            <div className="products">
                {prodetail.slice(0, 6).map((c) => {
                    return (
                        <div key={c._id}>
                            <div className="productsimage">
                                <div className="icons11"><Link to={`/product/${c._id}`}><FaSearch className="icon1" /></Link></div>
                                <img className="productsimagesize" src={`/${c.image}`} alt="catsize" />
                            </div>
                        </div>

                    )
                })}
            </div>
        </>
    )
}