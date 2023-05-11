import "../assets/css/font-awesome.css"
import "../assets/flaticon/flaticon.css"
import "../assets/css/swiper.min.css"
import "../assets/css/bootstrap.min.css"
import "../assets/css/style.css"
import "../assets/css/responsive.css"
import logo from '../assets/images/logo.png'
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {registration} from "../api/userAPI";


export const Register = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const navigate = useNavigate();
    const [usernameError, setUsernameError] = useState();
    const [emailError, setEmailError] = useState();
    const [phoneError, setPhoneError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [loading, setLoading] = useState(false);

    const clearErrorFields = () => {
        setUsernameError('')
        setEmailError('')
        setPasswordError('')
        setPhoneError('')
    }

    const signUp = async () => {
        setLoading(true)
        clearErrorFields()
        await registration(username, email, phone, password)
            .then((res) => {
                    clearErrorFields()
                    navigate('/login')
                }
            )
            .catch((err) => {
                    setLoading(false)
                    err.response.data.forEach(fieldError => {
                        switch (fieldError.field) {
                            case 'username': {
                                setUsernameError(fieldError.defaultMessage)
                                break;
                            }
                            case 'email': {
                                setEmailError(fieldError.defaultMessage)
                                break;
                            }
                            case 'password': {
                                setPasswordError(fieldError.defaultMessage)
                                break;
                            }
                            case 'phone': {
                                setPhoneError(fieldError.defaultMessage)
                                break;
                            }
                        }
                    })

                }
            )
            .finally(() => setLoading(false))
    }

    return (
        <div>
            <header className="header">

                <div className="logo-search-area">
                    <div className="container">
                        <div className="row justify-items-between">

                            <div className="col-md-12 col-sm-12">
                                <div className="logo">
                                    <NavLink to="/"><img style={{height:'10vh'}} src={logo} alt=""/></NavLink>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </header>


            {/*<section className="banner">*/}
            {/*    <div className="banner-overlay"></div>*/}
            {/*    <div className="banner-text">*/}
            {/*        <h2>Registration</h2>*/}
            {/*    </div>*/}
            {/*</section>*/}


            <section className="reservation style-3 section">
                <div className="container">
                    <div className="row">
                        <div className="section-head">
                            <i className="flaticon-cutlery"></i>
                            <h2>Register now</h2>
                            <p>Register to taste the most popular coffee and bakery</p>
                        </div>
                        <div className="reservation-form">
                            <div className="col" >
                                <div className="row" style={{marginLeft: 'auto',marginRight: 'auto',width:'33.3%'}}>
                                    <div className=" mx-auto">
                                        <div className="single-input">
                                            <input className="input-box" type="text" name="Name"
                                                   placeholder="Your Username*"
                                                   value={username}
                                                   onChange={(e) => setUsername(e.target.value)}/>
                                            <i className="fa fa-user"></i>
                                        </div>
                                        {usernameError &&
                                            <div className="pb-2 invalid-feedback-form text-center">{usernameError}
                                            </div>}
                                    </div>
                                </div>
                                <div className="row" style={{marginLeft: 'auto',marginRight: 'auto',width:'33.3%'}}>
                                    <div className="mx-auto">
                                        <div className="single-input">
                                            <input className="input-box" type="email" name="mail"
                                                   placeholder="Your Email*"
                                                   value={email}
                                                   onChange={(e) => setEmail(e.target.value)}/>
                                            <i className="fa fa-envelope"></i>
                                        </div>
                                        {emailError &&
                                            <div className="pb-2 invalid-feedback-form text-center">{emailError}
                                            </div>}
                                    </div>
                                </div>
                                <div className="row" style={{marginLeft: 'auto',marginRight: 'auto',width:'33.3%'}}>
                                    <div className="mx-auto" >
                                        <div className="single-input">
                                            <input className="input-box" type="text" name="phone" placeholder="Phone*"
                                                   value={phone}
                                                   onChange={(e) => setPhone(e.target.value)}/>
                                            <i className="fa fa-phone"></i>
                                        </div>
                                        {phoneError &&
                                            <div className="pb-2 invalid-feedback-form text-center">{phoneError}
                                            </div>}
                                    </div>
                                </div>
                                <div className="row" style={{marginLeft: 'auto',marginRight: 'auto',width:'33.3%'}}>
                                    <div className="mx-auto">
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
                                        <button className="button" onClick={signUp}>
                                            Register now
                                        </button>
                                    </div> :
                                    <div className="reservation-btn">
                                        <button className="button">
                                            {/*<ReactLoading type={"spin"} color={'#000000'}/>*/}
                                            Loading...
                                        </button>
                                    </div>}
                                <div className="section-head mt-3">

                                    <p className="mb-0">Already have an account? <NavLink style={{color:'#ffb902'}} to="/login">Login now</NavLink></p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <footer>

                <div className="scroll-top">
                    <i className="fa fa-angle-up"></i>
                </div>
                <div className="footer-bottom">
                    <p>&copy; <span>Coffeeffee</span> 2016, All Right Reserves | Design by <a href="#">KSheveleva</a></p>
                </div>
            </footer>
        </div>
    );
};