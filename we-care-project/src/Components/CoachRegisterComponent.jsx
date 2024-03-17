import { useState } from "react";
import Header from "./HeaderComponent"
import ValidateForm from "../Services/ValidateForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Coachregister = () => {
    var initialForm = {
        name: "",
        password: "",
        gender: "",
        dateOfBirth: "",
        mobileNumber: "",
        speciality: ""
    };
    const navigate = useNavigate();
    const [coachForm, setcoachForm] = useState(initialForm);
    const [formErrors, setformErrors] = useState(initialForm);
    const [formsubmitted, setformsubmitted] = useState(false);
    const [coaches, setcoaches] = useState([]);

    const registerCoach = (formData) =>{

        axios.post("http://localhost:8080/coaches/",formData).then((res) => {console.log(res.data); console.log(parseInt(res.data)); setcoaches(res.data)})
       
       .catch((err) => {console.log(err);})
   
   }
    const handleChange = (event) =>{
        var Fieldvalue;
        const {name, value, type} = event.target;

        if(type === "radio"){
            Fieldvalue = value;
        }
        else if(type === "date"){
            var dob = new Date(value);
            var time_diff = Date.now() - dob.getTime();
            var age_diff = new Date(time_diff);
            var year = age_diff.getUTCFullYear();
            var currentage = Math.abs(year - 1970);
            Fieldvalue = currentage;
        }
        else{
            Fieldvalue = value.trim();
        }
        setcoachForm({...coachForm, [name] : Fieldvalue});
        const error =  ValidateForm(name, value);
        setformErrors({...formErrors, [name] : error});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var newerrorform = {};
        Object.keys(coachForm).forEach((keys) => {
            newerrorform[keys] = ValidateForm(keys, coachForm[keys]);
        });

        setformErrors(newerrorform);
        if(Object.values(newerrorform).some((errors) => errors)){
            return;
        }
        registerCoach(coachForm);
        setformsubmitted(true);
    }
    return(
        <div>
            <Header />
            <div className="fullpagediv">
                <div className="container" style={{width:"40%"}}>
                <div>
                    <h1>Life Coach Profile</h1>
                    {!formsubmitted ? 
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Name :</label>
                            <input className="form-control" type="text" name="name" onChange={(e) =>{handleChange(e)} } />
                            {formErrors.name && <span className="text-danger">{formErrors.name}</span>}
                            </div>
                            <div className="form-group">
                            <label className="form-label">Password :</label>
                            <input className="form-control" type="password" name="password" onChange={(e) =>{handleChange(e)} } />
                            {formErrors.password && <span className="text-danger">{formErrors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Date of birth :</label>
                            <input className="form-control" type="date" name="dateOfBirth" onChange={(e) =>{handleChange(e);} } />
                            {formErrors.dateOfBirth && <span className="text-danger">{formErrors.dateOfBirth}</span>}
                            </div>
                            <label className="form-label">Gender :</label>
                            <div class="form-check">
  <input class="form-check-input" type="radio" name="gender" value="M" id="male" onChange={(e) =>{handleChange(e)} } />
  <label class="form-check-label" for="male">
    Male
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="gender" value="F" id="female" onChange={(e) =>{handleChange(e)} } />
  <label class="form-check-label" for="female">
    Female
  </label>
</div>
{formErrors.gender && <span className="text-danger">{formErrors.gender}</span>}
                        <div className="form-group">
                            <label className="form-label">Mobile No :</label>
                            <input className="form-control" type="text" name="mobileNumber" onChange={(e) =>{handleChange(e)} } />
                            {formErrors.mobileNumber && <span className="text-danger">{formErrors.mobileNumber}</span>}
                            </div>
                            <div className="form-group">
                            <label className="form-label">Specality :</label>
                            <input className="form-control" type="text" name="speciality" onChange={(e) =>{handleChange(e)} } />
                            {formErrors.speciality && <span className="text-danger">{formErrors.speciality}</span>}
                        </div><br />
                        <button type="submit" className="btn btn-success">Register</button>
                    </form> :   <div className="container" style={{width:"40%"}}><h2>You are Coach now !</h2><br /> <h4>Your Coach ID is {coaches.id}</h4>
                    <br />
                    <button className="btn btn-primary" onClick={() => {navigate("/coachlogin")}}>Login Now</button>
                    </div>}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Coachregister;