
import Header from "./HeaderComponent"
import { useNavigate } from "react-router-dom";

const Home = () =>{
    const navigate = useNavigate();
    return(
        <div>
            <Header />
            <div className="container">
                <div className="flex-container">
                    <div className="coachparent">
                    <div className="coachdiv">
                        <button className="btn btn-info" onClick={() => {navigate("/coachlogin")}}>Login as a coach</button>
                        <button className="btn btn-info" onClick={() => {navigate("/coachregister")}}>Join as a coach</button>
                    </div>
                    </div>
                    <div className="userdiv">
                    <button className="btn btn-info" onClick={() => {navigate("/userlogin")}}>Login as a user</button>
                        <button className="btn btn-info" onClick={() => {navigate("/usersignup")}}>Join as a user</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;