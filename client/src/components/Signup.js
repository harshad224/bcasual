import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import '../css/auth.css';
import { signupUser } from '../redux/signupRedux'



export default function Signup() {

    const [fill, setFill] = useState({
        email: '',
        username: '',
        password: '',
        confirm: ''
    })
    const dispatch = useDispatch()
    const { error } = useSelector(state => state.signups)

    const onHandleChange = (event) => {
        const { name, value } = event.target
        return setFill({ ...fill, [name]: value })
    }

    const { email, username, password } = fill
    const onHandleSubmit = (event) => {
        event.preventDefault()
        dispatch(signupUser({ email, username, password }))

        setFill({
            email: '',
            username: '',
            password: '',
            confirm: ''
        })
    }


    return (
        <div className="auth">
            <div className="lam"><h1 className="lam1"><Link to="/">BCasual</Link></h1></div>
            <div>
                <form className="auth1" >
                    <h3 className="heading">Signup</h3>
                    <div className="auth2">
                        <input type="email" id="email" name="email" placeholder="email" value={fill.email} onChange={onHandleChange} /><br />

                        <input type="text" id="username" name="username" placeholder="username" value={fill.username} onChange={onHandleChange} /><br />

                        <input type="password" id="password" placeholder="password" name="password" value={fill.password} onChange={onHandleChange} /><br />
                        <div>
                            <input type="confirm" id="confirm" placeholder="confirm password" name="confirm" value={fill.confirm} onChange={onHandleChange} />
                        </div>
                        <button type="submit" onClick={onHandleSubmit} className="butt">Signup</button>
                    </div>
                    {error && <div style={{ color: 'red' }}>Something went wrong</div>}
                    <div className="create">Already have an account..?<Link to="/signin">Signin</Link></div>
                </form >
            </div >
        </div>
    )
}