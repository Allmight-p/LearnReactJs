
import { useDispatch } from "react-redux";
import { Navigate,useNavigate } from "react-router-dom";
import { Logout } from "../Actions/Action";


const Header = ({Schedule = "", Profile = "", LoggedIn = false, setdisplayProfile}) =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return(
        <nav style={{backgroundColor:"black", padding:"10px", marginBottom:"5%"}}><button className="btn btn-dark" onClick={() => {navigate("/home")}}>WeCare</button>
        <span style={{float: "right", color:"white"}} className="navbar-text">Call Us : 1234567890</span>
        {LoggedIn ?
        <>
        <button style={{float: "right"}} className="btn btn-dark" onClick={() => {LoggedIn = false; dispatch(Logout()); navigate("/home")}}>Logout</button>
        <button style={{float: "right"}} className="btn btn-dark" onClick={() => {Schedule === "/coachschedules" ? setdisplayProfile("Schedule") : setdisplayProfile("Appointment"); navigate(Schedule)}} >{Schedule === "/coachschedules" ? Schedule : "MyAppointments"}</button>
        <button style={{float: "right"}} className="btn btn-dark" onClick={() => {setdisplayProfile("Viewprofile"); navigate(Profile) }} >View Profile</button>
        </> : <></>}
        </nav>
    )
}

export default Header;
