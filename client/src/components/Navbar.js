import React, { useState } from "react";
import '../css/navbar.css';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"

export default function Navbar() {

    const quantity = useSelector(state => state.user.cart.quantity)
    const userr = useSelector(state => state.user.logins.currentUser)
    const [user, setUser] = useState(userr)

    const onHandleUser = () => {
        if (user) {
            setUser(null)
        } else {
            setUser(userr)
        }
    }
    return (
        <div className="navbi">
            <div className="option1">
                <select className="options">
                    <option>EN</option>
                    <option>HI</option>
                    <option>FR</option>
                    <option>IT</option>
                </select>
                <input type='text' />
            </div>
            <div>
                <Link to="/" className="lama"><h1 className="lamaa">BCasual</h1></Link>
            </div>
            <div className='right d-flex'>
                {user ? <div className="logout d-flex"><button onClick={onHandleUser}>LogOut</button><div><div className="username"><FaUser /></div>{userr.username}</div></div> : <><span className="right1"><Link to='/signup' className="register">Register</Link></span>
                    <span className="right1"><Link to='/signin' className="register">SignIn</Link></span></>}
                <span className="right1"><Link to="/cart"><button type="button" className="cartbut position-relative"><FaShoppingCart /><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {quantity}
                    <span className="visually-hidden">unread messages</span>
                </span></button> </Link></span>
            </div>
        </div >
    )
}