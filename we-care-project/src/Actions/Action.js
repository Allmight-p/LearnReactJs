import axios from "axios";

const coachValidate = (data) => {  
    return dispatch => {
        axios.get("http://localhost:8080/coaches/" + `?id=${data.coachid}` + `&password=${data.pwd}`)
        .then((res) => {
            let value = res.data;
            let result = value.some((val) => val);
            if(result){
                console.log(value.id);
                dispatch(Login(true, data.coachid));
            }
            else{
                dispatch(Login(false, ""));
            }
        })
        .catch((err) => {console.log(err)})
}
}

const Profile = (show) => {
    return{
        type : "Profile",
        show
    }
}

const Login = (status, id) => {
    return {
        type : "Login",
        status,
        id
    }
}

export {Login, coachValidate, Profile};