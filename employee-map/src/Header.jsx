import { Link, Outlet } from "react-router-dom"
const Header = () =>{
    return(
        <nav>
            <Link to="home">Home</Link> |
            <Link to="about">AboutUs</Link> |
            <Link to="contact">ContactUs</Link>
            <Outlet />
        </nav>
    )
}

export default Header;