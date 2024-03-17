import { useState } from "react";
import Header from "./HeaderComponent";
import ValidateForm from "../Services/ValidateForm";
import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { coachValidate } from "../Actions/Action";

const CoachLogin = () =>{
    const navigate = useNavigate();
    const auth = useSelector(state => state.coachReducer.isAuthenticated);
    const dispatch = useDispatch();
    const [coachid, setcoachid] = useState("");
    const [pwd, setpwd] = useState("");
    const [formErrors, setformErrors] = useState({id: "", pwd : "", cred : ""});
    const handleSubmit = (e) => {
        e.preventDefault();
        var validatecoach = ValidateForm("coachid", coachid);
        var validatepwd = ValidateForm("password", pwd);
        if(validatecoach != "" || validatepwd != ""){
            setformErrors({id : validatecoach, pwd : validatepwd});
            return;
        }
        // axios.get("http://localhost:8080/coaches/" + `?id=${coachid}` + `&password=${pwd}`)
        // .then((res) => {navigate("/coachhome");})
        // .catch((err) => {setformErrors({cred : "Invalid Credentials"})})
        let data = {coachid : coachid, pwd : pwd};
        dispatch(coachValidate(data));
        // if(auth === true){
        //     navigate("/coachhome");
        // }
    }
    return(
        <div>
            <Header />
        <div className="container" style={{width:"40%"}}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="coachid" placeholder="Coach id" onChange={(e) => {setcoachid(e.target.value)}} />
                    {formErrors.id && <span className="text-danger">{formErrors.id}</span>}
                </div>
                <div className="form-group">
                    <input type="text" name="password" placeholder="Password" onChange={(e) => {setpwd(e.target.value)}} />
                    {formErrors.pwd && <span className="text-danger">{formErrors.pwd}</span>}
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {formErrors.cred && <span className="text-danger">{formErrors.cred}</span>}
            {auth === true ? <Navigate to="/coachhome" /> : <span className="text-danger">Invalid Credentials</span>}
        </div>
        </div>
    )
}

export default CoachLogin;