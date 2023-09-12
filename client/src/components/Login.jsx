import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginImage from '../img/login.png'


const Login = (props) => {
    const [userLogin, setUserLogin] = useState({ email: "", password: "" });
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/login", userLogin, { withCredentials: true })
            .then(res => {
                console.log(res);
                window.localStorage.setItem("userId", res.data._id);
                navigate("/dashboard");
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.message);
            });
    }

    return (
        <>
            <div style={{ backgroundImage: `url(${loginImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "100vh", width: "100vw", zIndex: "-1", position: "fixed"}}></div>
            <div className='container py-5'>
                <h3 className='text-warning'>Welcome Back to Gamers Haul</h3>
                <h4 className='text-warning'>Login and dive back in!</h4>
                <div className='mt-3 pt-3'>
                    <form onSubmit={handleSubmit} className='w-50 h-50  mt-5 pt-5' >
                        <div className='mb-3'>
                            <input className='form-control' type="text" name="email" value={userLogin.email} placeholder="Email" onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <input className='form-control' type="password" name="password" value={userLogin.password} placeholder='password' onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })} />
                        </div>
                        {
                            error ?
                                <p className='form-text text-warning'>{error}</p> :
                                ""
                        }
                        <div>
                            <input className='form-control-sm text-bg-primary' type="submit" value="Login" />
                        </div>
                        <div>
                            <Link className='text-light' to={"/register"}>Don't have an account? Register Here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default Login;