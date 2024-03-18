import { useEffect, useState, React } from "react";
import Header from "./HeaderComponent";
import {useSelector} from "react-redux";
import axios from 'axios';

const CoachHome = () => {
    const [emp, setemp] = useState([]);
    const [viewprofile, setprofile] = useState([]);
    const loginid = useSelector(state => state.coachReducer.loginid);
    const [displayProfile, setdisplayProfile] = useState("");

    useEffect(() => {
        if(displayProfile === "Schedule"){
            axios.get("http://localhost:8080/bookings")
        .then((res) => {setemp(res.data);})
        .catch((err) => {console.log(err);})
        }
        else if(displayProfile === "Viewprofile"){
            axios.get("http://localhost:8080/coaches/" + `?id=${loginid}`)
        .then((res) => {setprofile(res.data);})
        .catch((err) => {console.log(err);})
        }
    },[displayProfile]);

    return(
        <>
            <Header Schedule="/coachschedules" Profile="/coachviewprofile" LoggedIn = {true} setdisplayProfile = {setdisplayProfile}  />
            <div className="container" id="coachhomepage">
                { displayProfile === "Schedule" ?
                    emp.map((details) => {
                        return(
                            details.id === undefined ? <h2>No plans scheduled yet</h2> :
                        <div className="appointments" key={details.id}>
                            <h3>AppointmentDate : {details.appointmentDate}</h3><br />
                            <h4>Slot : {details.slot}</h4><br /><br />
                            <span>Booking id : {details.id}</span><br />
                            <span>User id : {details.userId}</span><br />
                            </div>
                    );})                   
                : <>
                    {
                        viewprofile.map((details) =>{
                            return(
                                <div className="appointments" key={details.id}>
                                    <h3>Coach ID : {loginid}</h3>
                                    <h4>Date of birth : {details.dateOfBirth}</h4>
                                    <h5>Mobile No : {details.mobileNumber}</h5>
                                    <h6>Speciality : {details.speciality}</h6>
                                </div>
                            )
                        })
                    }
                </>}
            </div>
        </>
    )
}

export default CoachHome;
