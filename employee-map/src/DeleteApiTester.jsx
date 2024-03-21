import  axios  from "axios";
import { useEffect, useState } from "react"

const DeleteApiTester = () => {
    const [getdata, setdata] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/employee/")
        .then((res) => {setdata(res.data); console.log(res.data)})
        .catch((err) => {alert("Data not fetched...")});
    },[]);

    const handleDelete = (id) => {

            axios.delete("http://localhost:4000/employee/" + id)
            .then((res) => {alert("Data deleted successfully for ID :" + id); console.log(res.data)})
            .catch((err) => {alert("Data not Deleted...")});
        
    }

    return(
        <div style={{backgroundColor:"white", opacity:0.95, margin:"50px"}}>
            {getdata.map((details) => {
                return(
                    <div style={{padding:"50px", borderRadius:"10px"}} key={details.id}>
                        <h4 style={{backgroundColor:"blueviolet",color:"white",padding:"5px",borderRadius:"15px"}}>
                            Id: {details.id}
                        </h4>
                        <p>Employee ID : {details.empId}</p>
                        <p>Employee Name : {details.name}</p>
                        <p>Employee Designation : {details.designation}</p>
                        <button style={{padding:"10px", borderRadius:"5px",fontSize:"11px"}} onClick={() => {handleDelete(details.id);}}>Delete</button>
                    </div>
                )
            })}
            
        </div>
    )
}

export default DeleteApiTester;