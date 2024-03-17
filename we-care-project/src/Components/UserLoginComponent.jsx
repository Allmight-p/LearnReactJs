import { useState } from "react";
import Header from "./HeaderComponent";
import ValidateForm from "../Services/ValidateForm";
import axios from 'axios';

const UserLogin = () =>{

    const [Userid, setUserid] = useState("");
    const [pwd, setpwd] = useState("");
    const [formErrors, setformErrors] = useState({id: "", pwd : "", cred : ""});
    const handleSubmit = (e) => {
        e.preventDefault();
        var validateUser = ValidateForm("Userid", Userid);
        var validatepwd = ValidateForm("password", pwd);
        if(validateUser !== "" || validatepwd !== ""){
            setformErrors({id : validateUser, pwd : validatepwd});
            return;
        }
        axios.get("http://localhost:8080/users/" + `?id=${Userid}` + `&password=${pwd}`)
        .then((res) => console.log(res.data))
        .catch((err) => {setformErrors({cred : "Invalid Credentials"})})
    }
    return(
        <div>
            <Header />
        <div className="container" style={{width:"40%"}}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="Userid" placeholder="User id" onChange={(e) => {setUserid(e.target.value)}} />
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
        </div>
        </div>
    )
}

export default UserLogin;