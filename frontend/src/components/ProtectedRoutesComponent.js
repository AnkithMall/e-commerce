import { Outlet , Navigate } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
import LoginPage from "../pages/LoginPage";
import UserChatComponent from "./user/UserChatComponent";

const ProtectedRoutesComponent = ({admin}) => {
    const [isAuth,setIsAuth] = useState() ;

    useEffect(() => {
        axios.get("/api/get-token").then(res => {
            if(res.data.token){
                setIsAuth(res.data.token);
            }
            return isAuth ;
        })
    },[isAuth])

    if(isAuth === undefined) return <LoginPage/> ; 

    return isAuth && admin && isAuth !== "admin" ? (
        <Navigate to="/login" />
    ) : isAuth && admin ? (
        <Outlet/>
    ) : isAuth && !admin ? (
        <>
            <UserChatComponent />
            <Outlet/>
        </>
    ) : (
        <Navigate to="/login" />
    )
}

export default ProtectedRoutesComponent ;