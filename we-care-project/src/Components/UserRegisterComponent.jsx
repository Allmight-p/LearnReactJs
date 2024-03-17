import { useState } from "react"
import Header from "./HeaderComponent"
import ValidateForm from "../Services/ValidateForm";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const UserRegister = () => {
    const navigate = useNavigate();
    const initialForm = {
      name: "",
      password: "",
      gender: "",
      dateOfBirth: "",
      email: "",
      mobileNumber: 0,
      pincode: 0,
      city: "",
      state: "",
      country: ""
    }
    const [formData, setForm] = useState(initialForm);
    const [errorform, seterrorform] = useState(initialForm);
    const [responsedata, setresponse] = useState([]);
    const [formsubmitted, setformsubmitted] = useState(false);

    const handleChange = (e) => {
        var Fieldvalue;
        const {name, value, type} = e.target;

        if(type === "date"){
            var dob = new Date(value);
            var time_diff = Date.now() - dob.getTime();
            var month_diff = new Date(time_diff);
            var currentyear = month_diff.getUTCFullYear();
            var age = Math.abs(currentyear - 1970);
            Fieldvalue = age;
            setForm({...formData, [name]: value});
        }
        else{
            Fieldvalue = value.trim();
            setForm({...formData, [name] : Fieldvalue})
        }

        var error = ValidateForm(name, Fieldvalue);
        seterrorform({...errorform, [name] : error});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var newformdata = {};

        Object.keys(formData).forEach((keys) => {
            newformdata[keys] = ValidateForm(keys, formData[keys])
        });

        if(Object.values(newformdata).some((err) => err)){
            seterrorform(newformdata);
            return;
        }
        else{
            axios.post("http://localhost:8080/users/",formData)
            .then((res) => {setresponse(res.data); setformsubmitted(true);})
            .catch((err) => {setformsubmitted(false)})
        }

    }
    return(
        <div>
            <Header />
            <div className="container" style={{width:"40%"}}>
                {!formsubmitted ?
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input className="form-control" type="text" name="name" onChange={(e) => {handleChange(e);}} />
                        {errorform.name && <span className="text-danger">{errorform.name}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input className="form-control" type="password" name="password" onChange={(e) => {handleChange(e);}} />
                        {errorform.password && <span className="text-danger">{errorform.password}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileNumber" className="form-label">Mobile No</label>
                        <input className="form-control" type="text" name="mobileNumber" onChange={(e) => {handleChange(e);}} />
                        {errorform.mobileNumber && <span className="text-danger">{errorform.mobileNumber}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">E-Mail</label>
                        <input className="form-control" type="text" name="email" onChange={(e) => {handleChange(e);}} />
                        {errorform.email && <span className="text-danger">{errorform.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="date" className="form-label">Date of Birth</label>
                        <input className="form-control" type="date" name="dateOfBirth" onChange={(e) => {handleChange(e);}} />
                        {errorform.dateOfBirth && <span className="text-danger">{errorform.dateOfBirth}</span>}
                    </div>
                    <label htmlFor="gender" className="form-group">Gender</label>
                    <div className="form-check">
                        <label htmlFor="Male" className="form-check-label">Male</label>
                        <input className="form-check-input" type="radio" name="gender" value="M" onChange={(e) => {handleChange(e);}} />
                    </div>
                    <div className="form-check">
                        <label htmlFor="female" className="form-check-label">Female</label>
                        <input className="form-check-input" type="radio" name="gender" value="F" onChange={(e) => {handleChange(e);}} />
                    </div>
                    {errorform.gender && <span className="text-danger">{errorform.gender}</span>}
                    <div className="form-group">
                        <label htmlFor="pincode" className="form-label">Pincode</label>
                        <input className="form-control" type="text" name="pincode" onChange={(e) => {handleChange(e);}} />
                        {errorform.pincode && <span className="text-danger">{errorform.pincode}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="city" className="form-label">City</label>
                        <input className="form-control" type="text" name="city" onChange={(e) => {handleChange(e);}} />
                        {errorform.city && <span className="text-danger">{errorform.city}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="state" className="form-label">State</label>
                        <input className="form-control" type="text" name="state" onChange={(e) => {handleChange(e);}} />
                        {errorform.state && <span className="text-danger">{errorform.state}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="country" className="form-label">country</label>
                        <input className="form-control" type="text" name="country" onChange={(e) => {handleChange(e);}} />
                        {errorform.country && <span className="text-danger">{errorform.country}</span>}
                    </div> <br />
                    <button className="btn btn-success" type="submit">Register</button>
                </form> : 
                <div className="container" style={{width:"40%"}}>
                    <h2>Account created successfully</h2>
                    <br />
                    <h4>Your user ID is {responsedata.id}</h4>
                    <br />
                    <button className="btn btn-primary" onClick={() => {navigate("/userlogin")}}>Login Now</button>
                    </div>}
            </div>
        </div>
    )
}

export default UserRegister;