import React from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom";

const LoginAuth = () => {
    const token = localStorage.getItem('token')

    return (
        token
            ? <Navigate to={'/dashboard'} replace={true} />
            : <Outlet />
    )
}

export default LoginAuth