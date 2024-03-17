import { useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"

const Header = ({Schedule = "", Profile = "", LoggedIn = false, setdisplayProfile}) =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return(
        <nav style={{backgroundColor:"black", padding:"10px", marginBottom:"5%"}}><button className="btn btn-dark" onClick={() => {navigate("/")}}>WeCare</button>
        <span style={{float: "right", color:"white"}} className="navbar-text">Call Us : 1234567890</span>
        {LoggedIn ?
        <>
        <button style={{float: "right"}} className="btn btn-dark" onClick={() => {setdisplayProfile(false); navigate(Schedule)}} >My Schedules</button>
        <button style={{float: "right"}} className="btn btn-dark" onClick={() => {setdisplayProfile(true); navigate(Profile) }} >View Profile</button>
        </> : <></>}
        </nav>
    )
}

export default Header;