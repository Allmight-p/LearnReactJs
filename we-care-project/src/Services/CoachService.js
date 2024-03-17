import axios from "axios";

const registerCoach = (formData) =>{

     axios.post("http://localhost:8080/coaches/",formData)
    .then((res) => {console.log(res.data);})
    .catch((err) => {console.log(err);})

}

export default registerCoach;
