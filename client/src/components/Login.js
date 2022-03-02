import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import '../css/auth.css';
import { loginUser } from '../redux/loginRedux'



export default function Login() {

    const [login, setLogin] = useState({
        email: '',
        password: '',
    })
    const dispatch = useDispatch()


    const { error } = useSelector(state => state.user.logins)


    const onHandleChange = (event) => {
        const { name, value } = event.target
        return setLogin({ ...login, [name]: value })
    }

    const { email, password } = login
    const onHandleSubmit = (event) => {
        event.preventDefault()

        dispatch(loginUser({ email, password }))

        setLogin({
            email: '',
            password: '',
        })
    }


    return (
        <div className="auth">
            <div className="lam"><h1 className="lam1"><Link to="/">LAMA</Link></h1></div>
            <div>
                <form className="auth1" >
                    <h3 className="heading">Login</h3>
                    <div className="auth2">
                        <input type="email" id="email" name="email" placeholder="email" value={login.email} onChange={onHandleChange} /><br />
                        <input type="password" id="password" placeholder="password" name="password" value={login.password} onChange={onHandleChange} /><br />
                        <button type="submit" onClick={onHandleSubmit} className="butt">Signin</button>
                    </div>
                    {error && <div style={{ color: 'red' }}>Something went wrong</div>}
                    <div className="create">Create new Account...<Link to="/signup">Signup</Link></div>

                </form >
            </div >
        </div>
    )
}