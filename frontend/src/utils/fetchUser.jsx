import { jwtDecode } from "jwt-decode";


export const fetchUser = () => {
    const userInfo = jwtDecode(localStorage.getItem('user')) !== 'undefined' ? jwtDecode(JSON.parse(localStorage.getItem('user'))) : localStorage.clear;

    return userInfo;
}