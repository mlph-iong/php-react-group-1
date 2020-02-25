import * as jwt_decode from 'jwt-decode';

function IsLoggedInChecker() {
    "use strict"
    let isLoggedIn
    try{
        let decoded = jwt_decode(localStorage.getItem("usertoken"))
        if ( Date.now() >= decoded.exp * 1000) {
            isLoggedIn = false
        } else {
            isLoggedIn = true
        }
    } catch (e){
        isLoggedIn = false
    }
    return isLoggedIn
}

function Logout() {
    return axios
            .get('api/logout' + '?token=' + localStorage.getItem("usertoken"))
            .then(response => {
                localStorage.removeItem("usertoken")
            })
            .catch(err => {
                localStorage.removeItem("usertoken")
            });
}

function GetUserDetails() {
    return axios
            .get('api/users/current-user')
            .then(response => {
                return response;
            });
}

export {
    IsLoggedInChecker,
    Logout,
    GetUserDetails
}