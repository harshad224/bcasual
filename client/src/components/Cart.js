import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import '../css/cart.css';
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../redux/cartRedux"
import StripeCheckout from "react-stripe-checkout";
import axios from "axios"

export default function Cart() {

    const navigate = useNavigate()
    const cart = useSelector(state => state.user.cart.product)
    const user = useSelector(state => state.user.logins.currentUser)
    const total = useSelector(state => state.user.cart.total)
    const [stripeToken, setStripeToken] = useState(null)
    const dispatch = useDispatch()

    const onHandleDelete = (id) => {
        dispatch(deleteProduct(id))
    }

    const handleCheck = () => {
        if (!user) {
            return navigate("/signin")
        }
    }
    const KEY = process.env.REACT_APP_STRIPE

    const onToken = (token) => {
        setStripeToken(token)
    }
    console.log(stripeToken)

    useEffect(() => {
        const makeRequest = async () => {
            try {
                if (cart && user) {
                    axios.post("http://localhost:8000/api/checkout/payment", { tokenId: stripeToken.id, amount: 2000, })
                } else {
                    window.alert("Please Login/Add item to the cart")
                }
            } catch (err) {
                console.log(err)
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken])
    return (
        <>
            <Navbar />

            <div className="container shoppingcart">
                <div className="shopps">Your Cart</div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="ordersummary">
                            <div className="row">
                                <div className="col order">
                                    Order Summary
                                </div>
                            </div><hr />
                            <div className="row order1">
                                <div className="row">
                                    <div className="col">
                                        Sub-total
                                    </div>
                                    <div className="col totalcash1">
                                        {total}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        Shipping
                                    </div>
                                    <div className="col free">
                                        Free
                                    </div>
                                </div>
                            </div><hr />
                            <div className="row total">
                                <div className="col">Total</div>
                                <div className="col totalcash">{total}</div>
                            </div>
                        </div>
                        {user && <StripeCheckout
                            name="Shopify"
                            billingAddress
                            shippingAddress
                            description={`Your total is ${total}`}
                            amount={total * 100}
                            token={onToken}
                            stripeKey={KEY}>
                            <button className="btn btn-success w-100 py-3" onClick={handleCheck}>CHECKOUT</button>
                        </StripeCheckout>}
                    </div>
                    <div className="col-md-8 my5">
                        <div className="row">
                            <div className="col-5">
                                <div>Product</div>
                            </div>
                            <div className="col">
                                <div>Price</div>
                            </div>
                            <div className="col">
                                <div>Quantity</div>
                            </div>
                            <div className="col">
                                <div>Total</div>
                            </div>
                        </div><hr />
                        <div className="scrolly">
                            {cart.map((s) => {
                                return (
                                    <div key={s._id}>
                                        <div className="row">
                                            <div className="d-flex col alignself">
                                                <img src={s.image} className="cartimg" alt="jacket" />
                                            </div>
                                            <div className="col alignself">
                                                <div><strong>{s.title}</strong></div>
                                                <div>{s.size}</div>
                                                <button className="btn" style={{ backgroundColor: `${s.color}` }}></button>
                                            </div>
                                            <div className="col alignself">
                                                <div>{s.price}</div>
                                            </div>
                                            <div className="col alignself">
                                                <div>{s.amount}</div>
                                            </div>
                                            <div className="col alignself trash">
                                                <div>{s.price * s.amount}</div>
                                                <FaTrash className="trash1" onClick={() => onHandleDelete(s._id)} />
                                            </div>

                                        </div><hr />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}