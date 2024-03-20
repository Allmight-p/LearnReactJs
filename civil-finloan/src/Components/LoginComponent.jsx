import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [loginForm, setLoginForm] = useState({userID : "", password : ""});
    const [error, seterror] = useState("");
    const [loggedin, setloggedin] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if(loginForm.userID === "" || loginForm.password === ""){
            return;
        }
        else{
            axios.get("http://localhost:4000/members/" + `?userID=${loginForm.userID}` + `&password=${loginForm.password}`)
            .then((res) => {Object.keys(res.data).length > 0 ? setloggedin(true) : setLoginForm(false)})
            .catch((err) => {setloggedin(false)})
            if(loggedin){
                seterror("");
                setTimeout(() => {
                    if(loggedin){
                    navigate("/profile")
                    }
                }, 3000)
                }
                else{
                    seterror("Details do not exist in our database!!");
                }

        }
    }
    return(
        <div>
            <nav>
                <button className="btn btn-info" onClick={() => {navigate("/home")}}>Civil Finloan</button>
                <button className="btn btn-info">About us</button>
                <select>Services</select>
                <div className="nav-right">
                    <button className="btn btn-info">EMI Calculator</button>
                    <button className="btn btn-info">Join as a member</button>
                    <button className="btn btn-info">Update Profile</button>
                    <button className="btn btn-info">Login</button>
                </div>
            </nav>
            <div className="container" style={{width : "40%"}}>
                <div id="gray-box">
                    <h4>Login</h4>
                    <form>
                        <div className="form-group">
                        <label className="form-label" htmlFor="userid">User ID:</label>
                        <input className="form-control" type="text" name="userid" onChange={(e) => {setLoginForm({...loginForm, userID : e.target.value})}} />
                        </div>
                        <div className="form-group">
                        <label className="form-label" htmlFor="password">Password:</label>
                        <input className="form-control" type="password" name="password" onChange={(e) => {setLoginForm({...loginForm, password : e.target.value})}}  />
                        </div>
                        <br />
                        <button className="btn btn-warning" onClick={(e) => {handleSubmit(e)}}>Login</button>
                        <div>
                        {error && <span className="text-danger">{error}</span>}
                        {loggedin && <span className="text-success">Login Successful!! Please wait profile page loading...</span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;