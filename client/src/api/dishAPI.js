import axios from "axios";
import {getToken} from "./userAPI";

export const allDishes = async (params) => {
    return axios({
        method: 'GET',
        url: `https://cafebackend.onrender.com/api/dishes`,
        params: params,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const deleteDish = async (dish) => {
    return axios({
        method: 'DELETE',
        url: `https://cafebackend.onrender.com/api/dishes/${dish.id}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const updateDish = async (dish,id) => {
    return fetch(`https://cafebackend.onrender.com/api/dishes/${id}`, {
        method: "PUT",
        body: dish,
        headers: {'Authorization': 'Bearer ' + getToken()}
    })
}

export const createDish = async (dish) => {
    return fetch(`https://cafebackend.onrender.com/api/dishes`, {
        method: "POST",
        body: dish,
        headers: {'Authorization': 'Bearer ' + getToken()}
    })
}