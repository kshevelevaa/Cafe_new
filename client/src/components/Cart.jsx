import {useEffect, useState} from "react";
import {Header} from "./Header";
import {Footer} from "./Footer";
import {NavLink} from "react-router-dom";
import {dishPicture} from "./Menu";
import AnchorLink from "react-anchor-link-smooth-scroll";
import {changeDishInOrder, currentOrder, processOrder, removeDishInOrder} from "../api/orderAPI";
import dayjs from "dayjs"

export const Cart = () => {


    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState()
    const [orderComplete, setOrderComplete] = useState(false);
    const [addressError, setAddressError] = useState();
    useEffect(() => {
        setTimeout(() => {
            currentOrder().then(data => {
                setDishes(data.data)
            }).finally(() => {
                setLoading(false)
            })
        }, 100);
    }, []);
    const changeDish = async (dish, plus) => {
        setLoading(true)
        await changeDishInOrder(dish.dish, plus).then(res => {
            if (res.data !== '') {
                setDishes(prevState => {
                    prevState[prevState.indexOf(prevState.find(item => item.id === res.data.id))] = res.data
                    return prevState
                })
            } else {
                console.log(dishes.filter(item => {
                    console.log(item.dish.id)
                    console.log(dish.id)
                    return item.dish.id !== dish.id
                }))
                setDishes(prevState => prevState.filter(item => item.id !== dish.id))
                console.log(dishes)
            }
        }).finally(e => setLoading(false))
    }

    const removeDish = async (dish) => {
        setLoading(true)
        await removeDishInOrder(dish).then(res => setDishes(prevState => prevState.filter(item => item.id !== dish.id)))
    }

    const proceedCheckout = async () => {
        setAddressError('')
        const order = {
            address: address,
            orderDateTime: dayjs()
        }
        await processOrder(order)
            .then(res => {
                setOrderComplete(true)
                setDishes('')
            })
            .catch(e => {
                console.log(e.response.data)
                setAddressError(e.response.data[0].defaultMessage)
            })
    }


    return (
        <div>
            <section className="banner">
                <div className="banner-overlay"></div>
                <div className="banner-text">
                    <h2>Shop Cart</h2>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li>Shop cart page</li>
                    </ul>
                </div>
            </section>
            <Header
                total={dishes.length !== 0 ? dishes.reduce((previousValue, dish) => previousValue + dish.dish.price * dish.count, 0) : 0}
                dishesCount={dishes.length !== 0 ? dishes.reduce((previousValue, dish) => previousValue + dish.count, 0) : 0}/>


            {!orderComplete ? <section className="shopping-cart">
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
                                        <th className="cart-item-remove">delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        // loading ?
                                        // <th colSpan={4} className="col-md-12 col-sm-12"><ReactLoading
                                        //     className="mx-auto m-2"
                                        //     type={"bars"}
                                        //     color={'#ffb902'}/>
                                        // </th> :
                                        dishes?.length !== 0 ?
                                            dishes.map(dish => {
                                                return <tr>
                                                    <td className="cart-single-item">
                                                        <div className="item-img">
                                                            <NavLink href=""><img style={{width: '85px', height: '85px'}}
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
                                                            <input type="submit" name="submit" value="-" onClick={event => {
                                                                changeDish(dish, false)
                                                            }}/>
                                                            <input type="text" name="text" value={dish.count}/>
                                                            <input type="submit" name="submit" value="+" onClick={event => {
                                                                changeDish(dish, true)
                                                            }}/>
                                                        </div>
                                                    </td>

                                                    <td className="cart-total">
                                                        <span>${dish.count * dish.dish.price}.00</span>
                                                    </td>

                                                    <td className="cart-item-remove">
                                                        <NavLink to="#" onClick={e => removeDish(dish)}>
                                                            <i className="fa fa-times"></i>
                                                        </NavLink>
                                                    </td>

                                                </tr>
                                            }) :
                                            <th colSpan={4} className="section-head">
                                                <i className="flaticon-cup-of-hot-chocolate"></i>
                                                <h2>Your cart is empty</h2>
                                            </th>
                                    }


                                    </tbody>
                                </table>

                            </div>
                            <div className="coupon-checkout">
                                <div className="col-md-6">
                                    <input className="input-box" style={{fontFamily: 'Poppins'}} type="text" name="text"
                                           value={address}
                                           onChange={e => setAddress(e.target.value)}
                                           placeholder="Enter delivery address..."/>
                                    {addressError &&
                                        <div className="pb-2 invalid-feedback-form text-center">{addressError}
                                        </div>}
                                    {/*<input className="button" type="submit" name="submit" value="apply coupon"/>*/}
                                </div>

                                <div className="checkout">
                                    {dishes.length !== 0 &&
                                        <button type="submit" className="button"
                                                onClick={proceedCheckout}>proceed checkout</button>}
                                </div>

                            </div>

                            <div className="shipping-totalprice">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="total-price">
                                            <h3 style={{fontFamily: 'Poppins'}}>Cart Total</h3>
                                            <ul>
                                                <li className="order-total">
                                                    <span className="pull-left"
                                                          style={{fontFamily: 'Poppins'}}>Cart Total</span>
                                                    <p className="pull-right" style={{
                                                        marginBottom: '0px',
                                                        fontFamily: 'Poppins'
                                                    }}>${dishes.length !== 0 ? dishes.reduce((previousValue, dish) => previousValue + dish.dish.price * dish.count, 0) : 0}.00</p>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </section>
                : <section className="reservation style-2">
                    <div className="section-overlay section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="section-head">
                                    <h2>Your order proceeded successfully</h2>
                                    <p>You can go to menu to make new order.</p>
                                </div>

                                <div className="reservation-btn">
                                    <NavLink to="/menu" className="button">Menu</NavLink>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>}
            <Footer/>
        </div>
    );
};