import { useState } from "react"
import validateField from "./Validate";

const RegistrationForm = () => {
    const initialFormData = {
        name : "",
        email : "",
        password : "",
        confirmpassword : "",
        gender : "",
        hobbies : [],
        country : ""
    }
    const [formData, setformData] = useState(initialFormData);
    const [formErrors, setformErrors] = useState(initialFormData);

    const handleChange = (event) => {
        var FieldValue;
        const {name, value, type} = event.target;

        if(type === "checkbox"){
            if(formData.hobbies.includes(value)){
                FieldValue = formData.hobbies.filter((hobby) => hobby !== value);
            }
            else{
                FieldValue = [{...formData.hobbies, value}];
            }
        }
        else if(type === "radio"){
                FieldValue = value;
        }
        else{
            FieldValue = value.trim();
        }
        setformData({...formData, [name]: FieldValue});
        const error = validateField(name, FieldValue, formData);
        setformErrors({...formErrors, [name] : error});

    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        var newErrorForm = {};

        Object.keys(formData).forEach((keys) => {
            newErrorForm[keys] = validateField(keys, formData[keys], formData);
        });

        setformErrors(newErrorForm);

        if(Object.values(newErrorForm).some((error) => error)){
            return;
        }

        const datastring = Object.keys(formData).map((keys) => `${keys} : ${formData[keys]}`).join("\n");
        alert(`form data : \n${datastring}`);
    }

    return(
        <div>
            <div className="container">
                <h1>Registration Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input className="form-control" type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
                        {formErrors.name && <span className="text-danger">{formErrors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">E-mail</label>
                        <input className="form-control" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                        {formErrors.email && <span className="text-danger">{formErrors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-control" type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                        {formErrors.password && <span className="text-danger">{formErrors.password}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
                        <input className="form-control" type="password" id="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleChange} />
                        {formErrors.confirmpassword && <span className="text-danger">{formErrors.confirmpassword}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="gender">Gender</label>
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="male">Male</label>
                        <input className="form-check-input" type="radio" id="male" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} />
                        </div>
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="female">Female</label>
                        <input className="form-check-input" type="radio" id="female" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange}/>
                        </div>
                        {formErrors.gender && <span className="text-danger">{formErrors.gender}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="hobbies">Hobbies</label>
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="reading">Reading</label>
                            <input className="form-check-input" type="checkbox" id="reading" name="hobbies" value="reading" checked={formData.hobbies.includes("reading")} onChange={handleChange}  />
                            </div>
                            <div className="form-check">
                            <label className="form-check-label" htmlFor="travelling">Travelling</label>
                            <input className="form-check-input" type="checkbox" id="travelling" name="hobbies" value="travelling" checked={formData.hobbies.includes("travelling")} onChange={handleChange} />
                            </div>
                            <div className="form-check">
                            <label className="form-check-label" htmlFor="sports">Sports</label>
                            <input className="form-check-input" type="checkbox" id="sports" name="hobbies" value="sports" checked={formData.hobbies.includes("sports")} onChange={handleChange}  />
                        </div>
                        {formErrors.hobbies && <span className="text-danger">{formErrors.hobbies}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="country">Country</label>
                        <select id="country" className="form-select" name="country" value={formData.country} onChange={handleChange} >
                        <option selected>Open this select menu</option>
                            <option value="usa">USA</option>
                            <option value="canada">Canada</option>
                            <option value="australia">Australia</option>
                            <option value="dubai">Dubai</option>
                            <option value="uk">UK</option>
                        </select>
                        {formErrors.country && <span className="text-danger">{formErrors.country}</span>}
                    </div>
                    <div className="form-group">
                    <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default RegistrationForm;