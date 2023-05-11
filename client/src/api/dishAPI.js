import axios from "axios";
import {getToken} from "./userAPI";

export const allDishes = async (params) => {
    return axios({
        method: 'GET',
        url: `http://localhost:8080/api/dishes`,
        params: params,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const deleteDish = async (dish) => {
    return axios({
        method: 'DELETE',
        url: `http://localhost:8080/api/dishes/${dish.id}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const updateDish = async (dish,id) => {
    return fetch(`http://localhost:8080/api/dishes/${id}`, {
        method: "PUT",
        body: dish,
        headers: {'Authorization': 'Bearer ' + getToken()}
    })
}

export const createDish = async (dish) => {
    return fetch(`http://localhost:8080/api/dishes`, {
        method: "POST",
        body: dish,
        headers: {'Authorization': 'Bearer ' + getToken()}
    })
}