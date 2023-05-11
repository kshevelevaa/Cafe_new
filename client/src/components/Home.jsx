import {Header} from "./Header";
import {Footer} from "./Footer";
import {useEffect, useState} from "react";
import {allDishes} from "../api/dishAPI";
import {dishPicture} from "./Menu";
import {NavLink} from "react-router-dom";

export const Home = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState();
    useEffect(() => {
        setTimeout(() => {
            allDishes().then(data => {
                setDishes(data.data)
            }).finally(() => {
                setLoading(false)
            })
        }, 100);
    }, []);
    const filterDishes = async (field = undefined) => {
        let params = {}
        if (field) {
            params.filter = field
            setFilter(field)
        } else setFilter('')
        params.sort = undefined
        await allDishes(params).then(data => {
            setDishes(data.data)
        })

    }
    return (
        <div>
            <Header/>
            <section className="slider style-2">
                <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

                    <div className="carousel-inner" role="listbox">
                        <div className="item active  slide2">
                            <div className="slider-overlay">
                                <div className="banner-content">
                                    <i className="flaticon-food-5"></i>
                                    <h3>Welcome To our Caffee</h3>
                                    <h2>Drinkin' Good in the Coffeeffee</h2>
                                    <p>Appiately architect stand alone architectures clicks mortar awesome ebusiness
                                        Interactively
                                        redefine world class outsourcing after</p>
                                    <div className="slider-btn">
                                        <button type="submit" className="button">Learn More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
            <section className="food-menu-2">
                <div className="section-overlay section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="section-head">
                                <i className="flaticon-cutlery"></i>
                                <h2>Our Menu</h2>
                                <p>Rapidiously plagiarize scalable manufactured products for realtime ramatically
                                    actualize open-source metrics through fully tested vortals.</p>
                            </div>
                            <div className="food-menu-item-wrapper">
                                <div id="filters" className="button-group">
                                    <button className={!filter ? "button is-checked" : "button"}
                                            onClick={e => filterDishes('')}>show all
                                    </button>

                                    <button className={filter === "BREAKFAST" ? "button is-checked" : "button"}
                                            onClick={e => filterDishes("BREAKFAST")}>Breakfast
                                    </button>

                                    <button className={filter === "LUNCH" ? "button is-checked" : "button"}
                                            onClick={e => filterDishes("LUNCH")}>lunch
                                    </button>

                                    <button className={filter === "DINNER" ? "button is-checked" : "button"}
                                            onClick={e => filterDishes("DINNER")}>dinner
                                    </button>

                                    <button className={filter === "DRINK" ? "button is-checked" : "button"}
                                            onClick={e => filterDishes("DRINK")}>drinks
                                    </button>
                                </div>
                                <div className="grid">
                                    {dishes?.length !== 0 ? dishes.map(dish => {
                                            return <div className="element-item breakfast col-md-4 col-sm-6">
                                                <div className="food-item">
                                                    <div className="food-item-img">
                                                        <NavLink href="#"><img style={{width: '100px', height: '100px'}}
                                                                               src={dishPicture(dish)}
                                                                               alt=""/></NavLink>
                                                    </div>
                                                    <div className="food-item-details">
                                                        <div className="dotted-title">
                                                            <div className="dotted-name">
                                                                <a href="#">{dish.title}</a>
                                                            </div>
                                                            <div className="dotted-dot"></div>
                                                            <div className="dotted-price">
                                                                <span>${dish.price}.00</span>
                                                            </div>
                                                        </div>
                                                        <p>{dish.description}</p>

                                                    </div>
                                                </div>
                                            </div>
                                        }) :

                                        <div className="section-head">
                                            <i className="flaticon-food-5"></i>
                                            <h2>Dishes int this category not found</h2>
                                            <p>Contact to admin to add dishes</p>
                                        </div>}


                                </div>
                            </div>
                            <div className="element-item breakfast col-md-12 col-sm-12">
                                <div className="food-menu-btn">
                                    <NavLink to="/menu" type="submit" className="button">View All Menu</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="our-service section-padding">
                <div className="container">
                    <div className="row">
                        <div className="section-head">
                            <i className="flaticon-cutlery"></i>
                            <h2>Our Service</h2>
                            <p>Rapidiously plagiarize scalable manufactured products for realtime ramatically
                                actualize open-source metrics through fully tested vortals.</p>
                        </div>
                        <div className="our-service-wrapper">
                            <div className="col-md-4 col-sm-6">
                                <div className="our-service-left">
                                    <div className="our-service-item">
                                        <div className="our-service-item-icon sl-item-icon1">
                                            <i className="flaticon-food-3"></i>
                                        </div>
                                        <div className="our-service-item-des pull-left">
                                            <h2>Brithday Party</h2>
                                            <p>Conveniently imaiipact worldwide and data and improvements with holistic
                                                theme and
                                                improvements with holistic</p>
                                        </div>
                                    </div>
                                    <div className="our-service-item">
                                        <div className="our-service-item-icon sl-item-icon2">
                                            <i className="flaticon-glass-and-bottle-of-wine"></i>
                                        </div>
                                        <div className="our-service-item-des pull-left">
                                            <h2>Fine Dining</h2>
                                            <p>Conveniently imaiipact worldwide and data and improvements with holistic
                                                theme and
                                                improvements with holistic</p>
                                        </div>
                                    </div>
                                    <div className="our-service-item">
                                        <div className="our-service-item-icon sl-item-icon1">
                                            <i className="flaticon-fireworks"></i>
                                        </div>
                                        <div className="our-service-item-des pull-left">
                                            <h2>Opening Ceremony</h2>
                                            <p>Conveniently imaiipact worldwide and data and improvements with holistic
                                                theme and
                                                improvements with holistic</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 border-s-hide">
                                <div className="row">
                                    <div className="border-s"></div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="our-service-right">
                                    <div className="our-service-item">
                                        <div className="our-service-item-icon sr-item-icon1">
                                            <i className="flaticon-interlocking-rings"></i>
                                        </div>
                                        <div className="our-service-item-des pull-right">
                                            <h2>Widding Party</h2>
                                            <p>Conveniently imaiipact worldwide and data and improvements with holistic
                                                theme and
                                                improvements with holistic</p>
                                        </div>
                                    </div>
                                    <div className="our-service-item">
                                        <div className="our-service-item-icon sr-item-icon2">
                                            <i className="flaticon-drinking"></i>
                                        </div>
                                        <div className="our-service-item-des pull-right">
                                            <h2>Office Party</h2>
                                            <p>Conveniently imaiipact worldwide and data and improvements with holistic
                                                theme and
                                                improvements with holistic</p>
                                        </div>
                                    </div>
                                    <div className="our-service-item">
                                        <div className="our-service-item-icon sr-item-icon1">
                                            <i className="flaticon-dj"></i>
                                        </div>
                                        <div className="our-service-item-des pull-right">
                                            <h2>Hostess Party</h2>
                                            <p>Conveniently imaiipact worldwide and data and improvements with holistic
                                                theme and
                                                improvements with holistic</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};