import { useEffect, useState } from "react";

let Useeffecttest = () => {
    const [name,setname] = useState("Johnson");
    const [age, setage] = useState("27");
    const [pickle, setpickle] = useState("polle");
    useEffect(() => {
        console.log("MF got called...");
    })
    return(
        <div>
            <h4>Your name is {name}</h4>
            <h4>Your age is {age}</h4>
            <h4>{pickle}</h4>
        </div>
    );
}

export default Useeffecttest;