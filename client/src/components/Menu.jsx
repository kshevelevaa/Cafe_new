import {Header} from "./Header";
import {NavLink} from "react-router-dom";
import {Footer} from "./Footer";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import ReactLoading from "react-loading"
import defaultDrink from "../assets/images/food-menu/item15.jpg"
import defaultBreakfast from "../assets/images/food-menu/lunch1.jpg"
import defaultLunch from "../assets/images/food-menu/dinner18.jpg"
import defaultDinner from "../assets/images/food-menu/dinner19.jpg"
import upload from '../assets/images/upload.png'
import {allDishes, createDish, deleteDish, updateDish} from "../api/dishAPI";
import "../assets/css/style.css"
import AnchorLink from 'react-anchor-link-smooth-scroll'
import {changeDishInOrder, currentOrder} from "../api/orderAPI";

export const dishPicture = (dish) => {
    if (dish.image)
        return "http://localhost:8080/api/images/" + dish.image.id
    else {
        switch (dish.category) {
            case "DRINK":
                return defaultDrink
            case "BREAKFAST":
                return defaultBreakfast
            case "LUNCH":
                return defaultLunch
            case "DINNER":
                return defaultDinner
            default:
                return defaultDrink
        }
    }

}
export const Menu = () => {

        const [dishes, setDishes] = useState([]);
        const [title, setTitle] = useState();
        const [price, setPrice] = useState();
        const [description, setDescription] = useState();
        const [category, setCategory] = useState("DRINK");
        const [titleError, setTitleError] = useState();
        const [priceError, setPriceError] = useState();
        const [descriptionError, setDescriptionError] = useState();
        const [selectedName, setSelectedName] = useState('');
        const [filter, setFilter] = useState();
        const [sort, setSort] = useState();
        const [editDish, setEditDish] = useState();
        const [image, setImage] = useState();
        const [categoryType, setCategoryType] = useState(["DRINK", "BREAKFAST", "LUNCH", "DINNER"]);
        const [loading, setLoading] = useState(true);
        const [order, setOrder] = useState([]);
        const {user} = useContext(Context)

        useEffect(() => {
            setTimeout(() => {
                allDishes().then(data => {
                    setDishes(data.data)
                }).finally(() => {
                    setLoading(false)
                })
                currentOrder().then(data => {
                    setOrder(data.data)
                })
            }, 100);
        }, []);

        const Category = categoryType.map(Category => Category)


        const sortDishes = async (orderBy = undefined) => {
            console.log(orderBy)
            let params = {}
            if (orderBy) {
                params.sort = orderBy
                setSort(orderBy)
            } else setSort('')
            if (filter) {
                params.filter = filter
            }
            await allDishes(params).then(data => {
                setDishes(data.data)
            })
        }
        const filterDishes = async (field = undefined) => {
            let params = {}
            if (field) {
                params.filter = field
                setFilter(field)
            } else setFilter('')
            if (sort) {
                params.sort = sort
            }
            await allDishes(params).then(data => {
                setDishes(data.data)
            })

        }

        const clearErrorFields = () => {
            setTitleError('')
            setPriceError('')
            setDescriptionError('')
        }
        const clearFields = () => {
            setEditDish('')
            setTitle('')
            setPrice('')
            setDescription('')
            setSelectedName('')
            setImage()
        }

        const handleCategoryTypeChange = (e) => {
            setCategory(e.target.value)
        }
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                setImage(file);
                setSelectedName(file.name);
            }

        };

        const backToCreate = () => {
            clearFields()
            clearErrorFields()
            setEditDish()
        }

        const moveToEditDish = (dish) => {
            setEditDish(dish)
            setTitle(dish.title)
            setCategory(dish.category)
            setPrice(dish.price)
            setDescription(dish.description)
        }

        const editCurrentDish = async () => {
            setLoading(true)
            clearErrorFields()
            let formData = new FormData();
            const dish = {
                title: title,
                category: category,
                price: parseInt(price),
                description: description
            }
            if (image) formData.append("file", image)
            formData.append("dish", JSON.stringify(dish))
            setTimeout(
                await updateDish(formData, editDish.id).then(response => {
                        if (!response.ok) {
                            response.json().then(
                                err => {
                                    err.forEach(fieldError => {
                                        switch (fieldError.field) {
                                            case 'title': {
                                                setTitleError(fieldError.defaultMessage)
                                                break;
                                            }
                                            case 'price': {
                                                setPriceError(fieldError.defaultMessage)
                                                break;
                                            }
                                            case 'description': {
                                                setDescriptionError(fieldError.defaultMessage)
                                                break;
                                            }
                                        }
                                    })
                                }
                            )
                        } else {
                            clearFields()
                            clearErrorFields()
                            response.json().then(async (value) => {
                                setDishes(prevState => {
                                    prevState[prevState.indexOf(prevState.find(item => item.id === value.id))] = value
                                    return prevState
                                })
                                return value
                            })
                        }
                    }
                ).finally(e => {
                    setLoading(false)
                }), 100)
            allDishes().then(data => {
                setDishes(data.data)
            }).finally(() => {
                setLoading(false)
            })

        }


        const removeDish = async (dish) => {
            setLoading(true)
            await deleteDish(dish).then((res) => {
                setDishes(prevState => prevState.filter(item => item.id !== dish.id))
            }).finally(e => {
                setLoading(false)
            })
        }

        const createNewDish = async () => {
            setLoading(true)
            clearErrorFields()
            let formData = new FormData();
            let dish = {
                title: title,
                category: category,
                price: parseInt(price),
                description: description
            }
            if (image) formData.append("file", image)
            formData.append("dish", JSON.stringify(dish))
            JSON.stringify(dish)
            await createDish(formData).then(response => {
                    if (!response.ok) {
                        response.json().then(
                            err => {
                                err.forEach(fieldError => {
                                    switch (fieldError.field) {
                                        case 'title': {
                                            setTitleError(fieldError.defaultMessage)
                                            break;
                                        }
                                        case 'price': {
                                            setPriceError(fieldError.defaultMessage)
                                            break;
                                        }
                                        case 'description': {
                                            setDescriptionError(fieldError.defaultMessage)
                                            break;
                                        }
                                    }
                                })
                            }
                        )
                    } else {
                        clearFields()
                        clearErrorFields()
                        response.json().then(async (value) => {
                            setDishes(prevState => [...prevState, value])
                            return value
                        })
                    }
                }
            ).finally(e => {
                setLoading(false)
            })
        }

        const addToCart = async (dish) => {
            setLoading(true)

            await changeDishInOrder(dish, true).then(res => {
                    setOrder(prevState => {
                        let index = prevState.indexOf(prevState.find(item => item.id === res.data.id))
                        console.log(index)
                        if (index !== -1) {
                            prevState[index] = res.data
                            return prevState
                        } else return [res.data, ...prevState]

                    })
                }
            ).finally(e => setLoading(false))
        }


        return (
            <div>
                <Header
                    total={order.length !== 0 ? order.reduce((previousValue, dish) => previousValue + dish.dish.price * dish.count, 0) : 0}
                    dishesCount={order.length !== 0 ? order.reduce((previousValue, dish) => previousValue + dish.count, 0) : 0}/>

                <section className="banner">
                    <div className="banner-overlay"></div>
                    <div className="banner-text">
                        <h2>Our Assortment Page</h2>
                        <ul>
                            <li><NavLink to="/home">Home</NavLink></li>
                            <li>Menu page</li>
                        </ul>
                    </div>
                </section>
                <div className="shop-page">
                    <div className="container">
                        <div className="row">
                            <div className="isotope-top">
                                <div id="filters" className="button-group">
                                    <button className={!filter ? "button is-checked" : "button"}
                                            onClick={e => filterDishes('')}>view all
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
                                <div className="catagorys">
                                    <div className="catagory-item">
                                        <select onChange={event => sortDishes(event.target.value)}>
                                            <option value={''}>Sort by</option>
                                            <option value={'title'}>Title</option>
                                            <option value={'price'}>Price</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="food-menu-item-wrapper" id="menu">
                                {
                                    // loading ?
                                    // <div className="col-md-12 col-sm-12"><ReactLoading className="mx-auto" type={"bars"}
                                    //                                                    color={'#ffb902'}/></div>
                                    // :
                                    (dishes?.length !== 0 ? dishes.map((dish, index) => {
                                            return <div key={index}
                                                        className="element-item food-item style-2 col-md-3 col-sm-4">
                                                <div className="food-item-img">
                                                    <img style={{height: '270px', width: '100%'}}
                                                         src={dishPicture(dish)} alt=""/>
                                                    <div className="food-item-img-overlay"></div>
                                                    {user.isAdmin ? <div className="food-item-img-overlay-content">
                                                        <AnchorLink href="#admin" className="button mb-3"
                                                                    onClick={event => moveToEditDish(dish)}>Edit
                                                            dish</AnchorLink>
                                                        <AnchorLink href="#menu" className="button"
                                                                    onClick={event => removeDish(dish)}>Delete
                                                            dish</AnchorLink>
                                                    </div> : <div className="food-item-img-overlay-content">
                                                        <AnchorLink href="#menu" onClick={event => addToCart(dish)}
                                                                    className="button">Add to order</AnchorLink>
                                                    </div>}

                                                </div>
                                                <div className="food-item-details">
                                                    <div className="dotted-title">
                                                        <div className="dotted-name">
                                                            <a href="#">{dish.title}</a>
                                                        </div>
                                                        <div className="dotted-dot"></div>
                                                        <div className="dotted-price">
                                                            <span>${dish.price}</span>
                                                        </div>
                                                    </div>

                                                    <p>{dish.description}</p>

                                                </div>

                                            </div>
                                        }) :
                                        <div className="section-head">
                                            <i className="flaticon-food-5"></i>
                                            <h2>Dishes in this category not found</h2>
                                            <p>Contact to admin to add dishes</p>
                                        </div>)
                                }
                            </div>
                        </div>
                    </div>

                </div>
                {user.isAdmin && <section className="reservation style-3 section-padding" id="admin">
                    <div className="container">
                        <div className="row">
                            <div className="section-head">
                                <i className="flaticon-cutlery"></i>
                                <h2>Admin Section</h2>
                                {editDish ? <p>Edit dish "{editDish.title}"</p> : <p>Here you can add dishes to menu</p>}

                            </div>
                            <div className="contact-form">
                                <div>
                                    <div className="col-md-4 col-sm-6">
                                        <div className="single-input">
                                            <input className="input-box" type="text" name="title"
                                                   placeholder="Dish title"
                                                   value={title}
                                                   onChange={event => setTitle(event.target.value)}/>
                                            <i className="fa fa-list-alt"></i>
                                        </div>
                                        {titleError &&
                                            <div className="pb-2 invalid-feedback-form text-center">{titleError}
                                            </div>}
                                    </div>
                                    <div className="col-md-4 col-sm-6 calculate-shipping">
                                        <div className="catagory-item">
                                            <select className="input-box"

                                                    onChange={e => handleCategoryTypeChange(e)}>
                                                {editDish && <option>{editDish.category}</option>}
                                                {Category.map((category) => <option>{category}</option>)
                                                }
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <div className="single-input">
                                            <input className="input-box " type="text" name="price"
                                                   placeholder="Price"
                                                   value={price}
                                                   onChange={event => setPrice(event.target.value)}/>
                                            <i className="fa fa-dollar"></i>

                                        </div>
                                        {priceError &&
                                            <div className="pb-2 invalid-feedback-form text-center">{priceError}
                                            </div>}
                                    </div>
                                    <div className="col-md-12 col-sm-12 mb-2">
                                    <textarea rows="8" placeholder="Description" aria-required="true"
                                              value={description}
                                              autoComplete="off"
                                              onChange={event => setDescription(event.target.value)}></textarea>
                                        {descriptionError &&
                                            <div className="pb-2 invalid-feedback-form text-center">{descriptionError}
                                            </div>}
                                    </div>
                                    <div className="col-md-12 col-sm-12 mb-2">
                                        <div className="file-upload ">
                                            <img src={upload} style={{height: '10vh'}} alt="upload"/>
                                            <h3> {selectedName || "Click box to upload"}</h3>
                                            <p>Maximun file size 10mb</p>
                                            <input type="file"
                                                   accept="image/*"
                                                   onChange={e => handleFileChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="reservation-btn mt-3">
                                        <button className="button"
                                                onClick={editDish ? editCurrentDish : createNewDish}><AnchorLink
                                            style={{color: 'black'}}
                                            href="#menu">{editDish ? "Submit" : "Add dish"}</AnchorLink></button>
                                        {editDish && <button className="button ms-2"
                                                             onClick={backToCreate}><AnchorLink style={{color: 'black'}}
                                                                                                href="#menu">Cancel</AnchorLink>
                                        </button>}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </section>}

                <Footer/>
            </div>
        );
    }
;