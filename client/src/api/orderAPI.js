import axios from "axios";
import {getToken} from "./userAPI";

export const ordersHistory = async () => {
    return axios({
        method: 'GET',
        url: `https://cafebackend.onrender.com/api/orders/`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const orderTotal = async () => {
    return axios({
        method: 'GET',
        url: `https://cafebackend.onrender.com/api/orders/active/total`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const changeDishInOrder = async (dish, plus) => {
    return axios({
        method: 'POST',
        url: `https://cafebackend.onrender.com/api/orders/active/${dish.id}/change`,
        params: {
            plus: plus
        },
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const processOrder = async (order) => {
    return axios({
        method: 'POST',
        url: `https://cafebackend.onrender.com/api/orders/active/process`,
        data: order,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const removeDishInOrder = async (dish) => {
    return axios({
        method: 'DELETE',
        url: `https://cafebackend.onrender.com/api/orders/active/${dish.dish.id}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}
export const currentOrder = async () => {
    return axios({
        method: 'GET',
        url: `https://cafebackend.onrender.com/api/orders/active`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}
