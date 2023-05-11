import logo from '../assets/images/logo2.png'
import {NavLink, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {orderTotal} from "../api/orderAPI";
import AnchorLink from "react-anchor-link-smooth-scroll";

export const Header = (props) => {

    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState();
    const [dishesCount, setDishesCount] = useState();
    const {user} = useContext(Context)
    const logoutUser = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
    }
    const location = useLocation()
    useEffect(() => {
        setTimeout(() => {
            orderTotal().then(data => {
                setTotal(data.data.total)
                setDishesCount(data.data.dishesCount)
            }).finally(() => setLoading(false))
        }, 100);
    }, []);

    return (
        <header className="header style-2 main-nav">
            <div className="main-menu">
                <div className="container">
                    <div className="row">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <div className="navbar-brand logo">
                                <NavLink to="/home">
                                    <img src={logo} alt="logo"/>
                                </NavLink>
                            </div>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className={(location.pathname === '/home' || location.pathname === '/') && "active"}>
                                    <NavLink to="/home" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                             aria-haspopup="true" aria-expanded="false">Home </NavLink>
                                </li>
                                <li className={location.pathname === '/menu' && "active"}>
                                    <NavLink to="/menu" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                             aria-haspopup="true" aria-expanded="false">Menu</NavLink>
                                </li>
                                <li className={location.pathname === '/team' && "active"}><NavLink
                                    to="/team">Team</NavLink></li>
                                <li className={location.pathname === '/cart' && "active"}><NavLink to="/cart"
                                                                                                   data-toggle="dropdown"
                                                                                                   role="button"
                                                                                                   aria-haspopup="true"
                                                                                                   aria-expanded="false">Cart</NavLink>
                                </li>
                                <li className={location.pathname === '/history' && "active"}><NavLink to="/history">Orders history</NavLink></li>
                                <li><NavLink to='#'>Signed as: {user.user.username} </NavLink></li>
                                <li><NavLink to="/login" onClick={logoutUser}><i className="bi bi-door-open-fill ms-2"></i></NavLink></li>
                            </ul>
                            <div className="menu-right-area">
                                <div className="right search-area">
                                    <i className="fa fa-search icon-1"
                                       onClick={() => document.querySelector('.search-area').classList.toggle('search-form-open')}></i>
                                    <i className="fa fa-times icon-2"
                                       onClick={() => document.querySelector('.search-area').classList.toggle('search-form-open')}></i>
                                    <form className="search-form">
                                        <input type="search" placeholder="Search Your Queries"/>
                                    </form>
                                </div>
                                <div className="cart">
                                    <NavLink to="/cart">${props.total ? props.total : total}.00
                                        <i className="fa fa-shopping-basket "></i>
                                        <span>{props.dishesCount ? props.dishesCount : dishesCount}</span>
                                    </NavLink>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};