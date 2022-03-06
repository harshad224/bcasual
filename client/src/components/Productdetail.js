import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import '../css/productdetail.css';
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux"


export default function Productdetail() {

    const location = useLocation()
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const [amount, setAmount] = useState(1)
    const [productdes, setProductdes] = useState([])
    const productid = location.pathname.split("/")[2]
    const dispatch = useDispatch()

    useEffect(() => {

        const getproductdetail = async () => {
            try {
                const getpro = await axios.get(`/api/product/get/${productid}`)
                setProductdes(getpro.data._doc)
            } catch (err) {
                console.log(err)
            }
        }
        getproductdetail()
    }, [productid])


    const handleSize = (event) => {
        setSize(event.target.value)
    }
    const handleAmount = (event) => {
        setAmount(event.target.value)
    }

    const onHandleClick = () => {
        if (color && size && amount) {
            dispatch(addProduct({ ...productdes, color, size, amount }))
            window.alert("Added to the cart")
        } else {
            window.alert("Please select the given field(quantity,color,size)")
        }
    }

    const onHandleAmount = (inp) => {
        if (inp === "des") {
            amount > 0 && setAmount(amount - 1)
        }
        if (inp === "asc") {
            setAmount(amount + 1)
        }
    }


    return (
        <>
            <Navbar />
            <div className="productdetails">
                <div className="back1">
                    <Link to="/products/jackets">
                        <FaArrowLeft className="arrowleft" /><span className="arrowback">Back</span>
                    </Link>
                </div>
                <div className="productimg">
                    <img className="proimg123" src={`/${productdes.image}`} alt="category" />
                </div>
                <div className="pro">
                    <h1 className="protitle">{productdes.title}</h1>
                    <h1 className="proprice">{`Rs.${productdes.price}`}</h1>
                    <div className="colorsize">
                        <div className="plusminus">
                            <FaMinus className="plus" onClick={() => onHandleAmount("des")} /><input className="plusinput" type="text" name="amount" value={amount} onChange={handleAmount} /><FaPlus onClick={() => onHandleAmount("asc")} className="plus" />
                        </div>
                        <p className="procolor">Color :  <span>{productdes.color?.slice(1).map((z) => { return (<button type="button" className="btn colorbutton" style={{ backgroundColor: `${z}` }} name="color" onClick={() => setColor(z)} />) })}</span></p>
                        <p className="prosize">Size : <span>
                            <select name="size" value={size} onChange={handleSize}>
                                {productdes.size?.map((az) => {
                                    return (
                                        <option >{az}</option>
                                    )
                                })}
                            </select>
                        </span>
                        </p>
                    </div>
                    <button className="addcart" onClick={onHandleClick}>Add to cart</button>
                    <p className="prodes">{productdes.description}</p>
                    <div className="back">
                        <Link to="/products/jackets">
                            <FaArrowLeft className="arrowleft" /><span className="arrowback">Back</span>
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}