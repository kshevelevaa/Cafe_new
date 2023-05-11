import "../assets/css/font-awesome.css"
import "../assets/flaticon/flaticon.css"
import "../assets/css/swiper.min.css"
import "../assets/css/bootstrap.min.css"
import "../assets/css/style.css"
import "../assets/css/responsive.css"

import logo from '../assets/images/logo.png'
import {NavLink, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {login} from "../api/userAPI";
import {Context} from "../index";
import {Footer} from "./Footer";
import {observer} from "mobx-react-lite";


export const Login = observer(() => {
    const {user} = useContext(Context)
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState();
    const [loading, setLoading] = useState(false);

    const clearErrorFields = () => {
        setPasswordError('')
    }

    const signIn = async () => {
        clearErrorFields()
        setLoading(true)
        await login(username, password).then((response) => {
                console.log(response)
                user.setUser(response.user)
                user.setIsAuth(true)
                navigate('/home')
            }
        ).catch((e) => {
            setLoading(false)
            setPasswordError('Неверное имя пользователя или пароль')
        }).finally(() => {
            setLoading(false)
        })

    }

    return (
        <div>
            <header className="header">

                <div className="logo-search-area">
                    <div className="container">
                        <div className="row justify-items-between">

                            <div className="col-md-12 col-sm-12">
                                <div className="logo">
                                    <NavLink to="/"><img style={{height: '10vh'}} src={logo} alt=""/></NavLink>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </header>


            {/*<section className="banner">*/}
            {/*    <div className="banner-overlay"></div>*/}
            {/*    <div className="banner-text">*/}
            {/*        <h2>Login page</h2>*/}
            {/*    </div>*/}
            {/*</section>*/}


            <section className="reservation section-overlay section-padding">
                <div className="container">
                    <div className="row">
                        <div className="section-head">
                            <i className="flaticon-cutlery"></i>
                            <h2>Login now</h2>
                            <p>Login to taste the most popular coffee and bakery</p>
                        </div>
                        <div className="reservation-form">
                            <div className="col">
                                <div className="row" style={{marginLeft: 'auto', marginRight: 'auto', width: '33.3%'}}>
                                    <div className=" mx-auto">
                                        <div className="single-input">
                                            <input className="input-box" type="text" name="Name"
                                                   placeholder="Your Username*"
                                                   value={username}
                                                   onChange={(e) => setUsername(e.target.value)}/>
                                            <i className="fa fa-user"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{marginLeft: 'auto', marginRight: 'auto', width: '33.3%'}}>
                                    <div className=" mx-auto">
                                        <div className="single-input">
                                            <input className="input-box" type="password" name="Time"
                                                   value={password}
                                                   onChange={(e) => setPassword(e.target.value)}
                                                   placeholder="Password*"/>
                                            <i className="fa fa-lock"></i>
                                        </div>
                                        {passwordError &&
                                            <div className="pb-2 invalid-feedback-form text-center">{passwordError}
                                            </div>}
                                    </div>
                                </div>
                                {!loading ? <div className="reservation-btn">
                                        <button className="button" onClick={signIn}>
                                            Login
                                        </button>
                                    </div> :
                                    <div className="reservation-btn row">
                                        <button className="button">
                                            {/*<div className="col" style={{width:'10px',height:'10px'}}><ReactLoading type={"spin"}  color={'#000000'}/></div>*/}
                                            <div className="col">Loading...</div>
                                        </button>
                                    </div>}
                                <div className="section-head mt-3">

                                    <p className="mb-0">Don't have an account? <NavLink style={{color: '#ffb902'}}
                                                                                        to="/register">Register
                                        now</NavLink></p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>


        </div>
    );
});