import { useNavigate } from "react-router-dom";


const Profile = () => {
    const navigate = useNavigate();
    return(
        <div>
            <nav>
                <button className="btn btn-info">Civil Finloan</button>
                <button className="btn btn-info">About us</button>
                <select>Services</select>
                <div className="nav-right">
                    <button className="btn btn-info">EMI Calculator</button>
                    <button className="btn btn-info">Join as a member</button>
                    <button className="btn btn-info">Update Profile</button>
                    <button className="btn btn-info">Login</button>
                </div>
            </nav>
        </div>
    )   
}

export default Profile;