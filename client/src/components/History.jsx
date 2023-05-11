import {NavLink} from "react-router-dom";
import {Header} from "./Header";
import {Footer} from "./Footer";
import {useEffect, useState} from "react";
import {ordersHistory} from "../api/orderAPI";
import {dishPicture} from "./Menu";
import AnchorLink from "react-anchor-link-smooth-scroll";
import dayjs from "dayjs";

export const History = () => {
        const [orders, setOrders] = useState();
        const [loading, setLoading] = useState();
        useEffect(() => {
            setTimeout(() => {
                ordersHistory().then(data => {
                    setOrders(data.data)
                }).finally(() => {
                    setLoading(false)
                })
            }, 100);
        }, []);
        return (
            <div>
                <section className="banner">
                    <div className="banner-overlay"></div>
                    <div className="banner-text">
                        <h2>Orders History</h2>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li>Orders history page</li>
                        </ul>
                    </div>
                </section>
                <Header/>


                {orders?.length !== 0 ?
                    orders?.map(order => {
                        return <section className="shopping-cart">
                            <div className="container">
                                <div className="row">
                                    <div className="table-responsive cart-table">
                                        <table className="shop-cart">
                                            <thead>
                                            <tr>
                                                <th className="cart-single-item">product</th>
                                                <th className="cart-price">price</th>
                                                <th className="cart-quantity">quantity</th>
                                                <th className="cart-total">total</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                order?.dishOrderList.map(dish => {
                                                    return <tr>
                                                        <td className="cart-single-item">
                                                            <div className="item-img">
                                                                <NavLink href=""><img
                                                                    style={{width: '85px', height: '85px'}}
                                                                    src={dishPicture(dish.dish)}
                                                                    alt=""/></NavLink>
                                                            </div>
                                                            <div className="item-name">
                                                                <AnchorLink style={{color: '000000'}}
                                                                            to="#">{dish.dish.title}</AnchorLink>
                                                            </div>
                                                        </td>

                                                        <td className="cart-price">
                                                            <span>${dish.dish.price}.00</span>
                                                        </td>

                                                        <td className="cart-quantity">
                                                            <div className="product-quantity">

                                                                <input type="text" name="text" value={dish.count}/>

                                                            </div>
                                                        </td>

                                                        <td className="cart-total">
                                                            <span>${dish.count * dish.dish.price}.00</span>
                                                        </td>

                                                    </tr>
                                                })
                                            }


                                            </tbody>
                                        </table>

                                    </div>
                                    <section className="contact">
                                        <div className="container">
                                            <div className="row">
                                                <div className="contact-wrapper">
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="contact-item">
                                                            <i className="flaticon-placeholder"
                                                               style={{fontFamily: 'Poppins'}}></i>
                                                            <h2 style={{fontFamily: 'Poppins'}}>Delivery Address</h2>
                                                            <p style={{fontFamily: 'Poppins'}}>{order.address}</p>

                                                        </div>

                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="contact-item">
                                                            <i className="flaticon-time-is-running"
                                                               style={{fontFamily: 'Poppins'}}></i>
                                                            <h2 style={{fontFamily: 'Poppins'}}>Order date</h2>
                                                            <p style={{fontFamily: 'Poppins'}}>{dayjs(order.orderDateTime).format('D MMMM YYYY HH:mm')}</p>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="contact-item">
                                                            <i className="flaticon-cooker"
                                                               style={{fontFamily: 'Poppins'}}></i>
                                                            <h2 style={{fontFamily: 'Poppins'}}>Total price</h2>
                                                            <p style={{fontFamily: 'Poppins'}}>${order.total}.00</p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                </div>
                            </div>

                        </section>
                    })
                    : <section className="section-padding">
                        <div className="section-head">
                            <i className="flaticon-food-5"></i>
                            <h2>You have not orders right now</h2>
                            <p>Make first order to see history</p>
                        </div>
                    </section>
                }
                }
                <Footer/>
            </div>
        );
    }
;