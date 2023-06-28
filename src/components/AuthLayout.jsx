import { Navigate, Outlet } from 'react-router-dom';

export function AuthLayout(){
    const token = localStorage.getItem("token_user");

    if(!token) return <Navigate to={"/login"} replace={true}/>

    return <Outlet/>
}

export function Logged(){
    const token = localStorage.getItem("token_user");

    if(token) return <Navigate to={"/"} replace={true}/>

    return <Outlet/>;
}
