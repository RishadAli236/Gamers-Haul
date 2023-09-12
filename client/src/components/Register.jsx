import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import registerImage from '../img/register.png'


const Register = (props) => {
    const [newUser, setNewUser] = useState({ username: "", email: "", password: "", confirmPassword: "" })
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/register", newUser, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                window.localStorage.setItem("userId", res.data._id);
                navigate("/dashboard");
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors)
            })
    }

    return (
        <>
            <div style={{ backgroundImage: `url(${registerImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "100vh", width: "100vw", zIndex: "-1", position: "fixed"}}></div>
            <div className="container py-5">
                <h3 className='text-warning'>Register and explore Gamers Haul</h3>
                <div className='py-5'>
                    <form onSubmit={handleSubmit} className='w-50 h-50 '>
                        <div className='mb-3'>
                            <input className='form-control' type="text" name="username" value={newUser.username} placeholder="Username" onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
                            {
                                errors.username ?
                                    <p className='form-text text-warning'>{errors.username.message}</p> :
                                    ""
                            }
                        </div>

                        <div className='mb-3'>
                            <input className='form-control' type="text" name="email" value={newUser.email} placeholder='Email' onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                            {
                                errors.email ?
                                    <p className='form-text text-warning'>{errors.email.message}</p> :
                                    ""
                            }
                        </div>

                        <div className="mb-3">
                            <input className='form-control' type="password" name="password" value={newUser.password} placeholder='Password' onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                            {
                                errors.password ?
                                    <p className='form-text text-warning'>{errors.password.message}</p> :
                                    ""
                            }
                        </div>

                        <div className="mb-3">
                            <input className='form-control' type="password" name="confirmPassword" value={newUser.confirmPassword} placeholder='Confirm Password' onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })} />
                            {
                                errors.confirmPassword ?
                                    <p className='form-text text-warning'>{errors.confirmPassword.message}</p> :
                                    ""
                            }
                        </div>

                        <div className="mb-3">
                            <input className='form-control-sm text-bg-primary' type="submit" value="Register" />
                        </div>

                        <div className="mb-3">
                            <Link className='text-light' to={"/"}>Already have an account? Login here</Link>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
};

export default Register;