import axios from "axios";

export const registration = async ( username, email,phone, password) => {
    return axios({
        method: "POST",
        url: 'http://localhost:8080/api/auth/register',
        data: { username, email,phone, password}
    })

}

export const login = async (username, password) => {
    const {data} = await axios(
        {
            method: "POST",
            url: 'http://localhost:8080/api/auth/login',
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
        url: `http://localhost:8080/api/auth/info`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}



