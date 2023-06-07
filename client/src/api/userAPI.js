import axios from "axios";

export const registration = async ( username, email,phone, password) => {
    return axios({
        method: "POST",
        url: 'https://cafebackend.onrender.com/api/auth/register',
        data: { username, email,phone, password}
    })

}

export const login = async (username, password) => {
    const {data} = await axios(
        {
            method: "POST",
            url: 'https://cafebackend.onrender.com/api/auth/login',
            data: {username, password}
        }
    )
    localStorage.setItem('token', data.token)
    console.log(getToken())
    return data
}


export const getToken = () => {
    return localStorage.getItem('token')
}

export const info = async () => {
    return axios({
        method: 'GET',
        url: `https://cafebackend.onrender.com/api/auth/info`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}



