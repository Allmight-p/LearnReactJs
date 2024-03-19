import { useEffect, useState } from "react";
import Header from "./HeaderComponent";
import {useSelector} from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ValidateForm from "../Services/ValidateForm";

const UserHome = () => {
    const navigate = useNavigate();
    const [coaches, setcoaches] = useState([]);
    const [userprofile, setuserprofile] = useState([]);
    const [appointments, setappointments] = useState([]);
    const loginid = useSelector(state => state.coachReducer.loginid);
    const [displayProfile, setdisplayProfile] = useState("");
    const [bookingform, setbookingform] = useState({appointmentDate : "", slot : "", userId : "", coachId : ""});
    const [bookingerrorform, setbookingerrorform] = useState({appointmentDate : "", slot : "", userId : "", coachId : ""});

    useEffect(() => {
        if(displayProfile === "Viewprofile"){
            axios.get("http://localhost:8080/users/" + `?id=${loginid}`)
            .then((res) => {setuserprofile(res.data)})
            .catch((err) => console.log(err));
        }
        else if(displayProfile === "Appointment"){
            axios.get("http://localhost:8080/bookings/" + `?userId=${loginid}`)
            .then((res) => setappointments(res.data))
            .catch((err) => console.log(err));
        }
        else{
            axios.get("http://localhost:8080/coaches/")
            .then((res) => {setcoaches(res.data)})
            .catch((err) => console.log(err));            
        }
    },[displayProfile]);

    const handleFormSubmission =() =>{
        var sloterror = ValidateForm("slot", bookingform.slot);
        var appointmentdateerror = ValidateForm("appointmentDate", bookingform.appointmentDate);
        if(sloterror !== "" || appointmentdateerror !== "") {
            setbookingerrorform({...bookingerrorform, slot: sloterror, appointmentDate: appointmentdateerror});
        }
        else{
            
        }
    }

    const viewProfile = () => {
        return(
            userprofile.map((details) =>{
                    return(
                        <div  id="appointments">
                        <h2>{details.name}</h2>
                        <h3>Date of Birth : {details.dateOfBirth}</h3>
                        <h3>Email : {details.email}</h3>
                        <h3>Mobile No : {details.mobileNumber}</h3>
                        <h3>Address : {details.city + ", " + details.state}</h3>
                        <h3>Pincode : {details.pincode}</h3>
                        <button className="btn btn-info" onClick={() => {setdisplayProfile(false); navigate("/userhome")}}>Go Back</button>
                        </div>
                    );
                })
        )
    }

    const ViewAppointment =() =>{
        return(
            appointments.map((details) => {
                                return(
                                <div>
                                <div className="appointments">
                               <h2>Appointment Date : {details.appointmentDate}</h2> 
                               <h3>Slot : {details.slot}</h3>
                               <h4>Booking id : {details.id}</h4>
                               <h4>User id : {details.userId}</h4>
                               <h4>Coach id : {details.coachId}</h4>
                               <button className="btn btn-info">Reschedule Appointment</button>
                               <button className="btn btn-danger">Cancel Appointment</button>
                               </div>
                               <button className="btn btn-info" onClick={() => {setdisplayProfile(""); navigate("/userhome")}}>Go Back</button>
                               </div>
                            );})
        )
                        }

    const ViewCoaches = () =>{
        return(
            coaches.map((details) => {
                            return(
                            <div className="userappointments" key={details.id}>
                            <h2>{details.name}</h2>
                            <h3>Coach Id : {details.id}</h3>
                            <h4>Mobile No : {details.mobileNumber}</h4>
                            <h5>Speciality : {details.speciality}</h5>
                            <button className="btn btn-primary" onClick={() => {setdisplayProfile("Booking")}}>Book An Appointment</button>
                            </div>                        
                        );})
        )
    }

    const ViewAppointmentBookings = () =>{
        return(
            <div className="appointments">
                <h2>Proceed with your Appointment</h2>
                <form>
                    <label htmlFor="Doa">Date of Appointment :</label><br />
                    <input type="date" name="Doa" onChange={(e) => {setbookingform({...bookingform, appointmentDate: e.target.value})}} />
                    <br />
                    <label htmlFor="slot">Preffered Slot :</label><br />
                    <label htmlFor="slot">9AM to 10 AM :</label>
                    <input type="radio" name="slot" value="9AM to 10 AM" onChange={(e) => setbookingform({...bookingform, slot: e.target.value})} />
                    <label htmlFor="slot">10AM to 11 AM :</label>
                    <input type="radio" name="slot" value="10AM to 11 AM" onChange={(e) => setbookingform({...bookingform, slot: e.target.value})} />
                    <label htmlFor="slot">11AM to 12 PM :</label>
                    <input type="radio" name="slot" value="11AM to 12 PM" onChange={(e) => setbookingform({...bookingform, slot: e.target.value})} />
                    <label htmlFor="slot">12PM to 1 PM :</label>
                    <input type="radio" name="slot" value="12PM to 1 PM" onChange={(e) => setbookingform({...bookingform, slot: e.target.value})} />
                    <label htmlFor="slot">1PM to 2 PM :</label>
                    <input type="radio" name="slot" value="1PM to 2 PM" onChange={(e) => setbookingform({...bookingform, slot: e.target.value})} />
                    <br />
                    <button type="submit" className="btn btn-success">Confirm your appointment</button>
                </form>
            </div>
        )
    }

    const renderSwitch = (displayProfile) => {
        switch(displayProfile){
            case "Viewprofile":
                return viewProfile();
            case "Appointment":
                return ViewAppointment();
            case "Booking":
                return ViewAppointmentBookings();
               

            default:
                return ViewCoaches();
        }
    }


    return(
        <>
            <Header Schedule="/userappointments" Profile="/userviewprofile" LoggedIn = {true} setdisplayProfile = {setdisplayProfile}   />
            <div className="container" style={{width:"40%"}} id="coachhomepage">
                {
                    <>
                    {renderSwitch(displayProfile)}
                    </>
                    // displayProfile === "Viewprofile" ?
                    // userprofile.map((details) =>{
                    //     return(
                    //         <div  id="appointments">
                    //         <h2>{details.name}</h2>
                    //         <h3>Date of Birth : {details.dateOfBirth}</h3>
                    //         <h3>Email : {details.email}</h3>
                    //         <h3>Mobile No : {details.mobileNumber}</h3>
                    //         <h3>Address : {details.city + ", " + details.state}</h3>
                    //         <h3>Pincode : {details.pincode}</h3>
                    //         <button className="btn btn-info" onClick={() => {setdisplayProfile(false); navigate("/userhome")}}>Go Back</button>
                    //         </div>
                    //     );
                    // })
                    // :
                    // (displayProfile === "Appointment" ?
                    //     <div>                            
                    //         {
                    //             appointments.map((details) => {
                    //                 return(<div className="appointments">
                    //                <h2>Appointment Date : {details.appointmentDate}</h2> 
                    //                <h3>Slot : {details.slot}</h3>
                    //                <h4>Booking id : {details.id}</h4>
                    //                <h4>User id : {details.userId}</h4>
                    //                <h4>Coach id : {details.coachId}</h4>
                    //                <button className="btn btn-info">Reschedule Appointment</button>
                    //                <button className="btn btn-danger">Cancel Appointment</button>
                    //                </div>
                    //             );})
                    //         }
                    //         <button className="btn btn-info" onClick={() => {setdisplayProfile(""); navigate("/userhome")}}>Go Back</button>
                    //     </div>
                    //     :
                    //     <>
                    // <div>
                    //     {
                    //         coaches.map((details) => {
                    //             return(
                    //             <div className="userappointments" key={details.id}>
                    //             <h2>{details.name}</h2>
                    //             <h3>Coach Id : {details.id}</h3>
                    //             <h4>Mobile No : {details.mobileNumber}</h4>
                    //             <h5>Speciality : {details.speciality}</h5>
                    //             <button className="btn btn-primary">Book An Appointment</button>
                    //             </div>                        
                    //         );})
                    //     }
                    // </div>
                    // </>
                    // )
                    
                }
            </div>
        </>
    )

}

export default UserHome;
