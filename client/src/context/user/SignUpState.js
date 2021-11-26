import { useState } from "react";
import SignUpContext from "./SignUpContext";


import DB_ROUTE from "../../config.js";

const SignUpState = (props) => {
    const host = DB_ROUTE;

    // getting user info from local storage to use it in different component
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("profile")));

    const signUp = async (userInfo) => {
        // API call hoga
        const response = await fetch(`${host}/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        })
        const json = await response.json(); // to get user Info in object format
        // console.log(json);
        localStorage.setItem("profile", JSON.stringify(json)) // it saves user Info in local storage
        setUserData(JSON.parse(localStorage.getItem("profile")))
    }

    const login = async (userInfo) => {
        // API call hoga
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        })
        const json = await response.json(); // to get user Info in object format
        console.log(json);
        localStorage.setItem("profile", JSON.stringify(json)) // it saves user Info in local storage
        setUserData(JSON.parse(localStorage.getItem("profile")))
    }

    const logOut = () => {
        localStorage.removeItem("profile");
        setUserData({});
    }

    const updateProfile = async (userInfo) => {
        // API call hoga
        try {
            await fetch(`${host}/api/auth/updateUser`)
                .then(async res => {
                    if (res.ok) {
                        const json = await res.json();
                        console.log(json);
                    }
                })
                .catch(error => {
                    console.log("ERROR : ", error.response);
                })
            // const response = await fetch(`${host}/api/auth/updateUser`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "auth-token": userData?.userToken
            //     },
            //     body: JSON.stringify(userInfo)
            // });
            // const json = await response.json();
            // console.log("From front End : ", "json.message", json.message, "json.status", json.status, "json.err", json.error, json.stack);
        } catch (error) {
            console.log("Error in SignUpState ", error.res);
        }
    }

    return (
        <SignUpContext.Provider value={{ signUp, userData, login, logOut, updateProfile }}>
            {props.children}
        </SignUpContext.Provider>
    )
}

export default SignUpState;