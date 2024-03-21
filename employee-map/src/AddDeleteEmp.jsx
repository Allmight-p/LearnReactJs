import { useEffect, useState } from "react"
import axios from "axios"


const AddDeleteEmployee = () => {
    const [employee, setemployee] = useState([]);
    const [addflag, setflag] = useState(false);
    const [updateflag, setupdateflag] = useState(false);
    const [empname, setempname] = useState("");
    const [empdesg, setempdesg] = useState("");
    const [empid, setempid] = useState("");
    const [message, setmessage] = useState("");
    const [updatedemp, setupdatedemp] = useState({id : "", name : "", designation : "", empId : ""});

    //Call emp api at the start of the application
    useEffect(() => {
        axios.get("http://localhost:4000/employee/")
        .then((res) => {setemployee(res.data); console.log(res.data)})
        .catch((err) => alert("Data is not fetched..."))
    },[]);

    //Add or Post employee details to db.json
    const addEmployees = (e) => {
        e.preventDefault();
        let emp = {name : empname, designation : empdesg, empId : empid};
        if(empname === "" || empdesg === "" || empid === ""){
            setmessage("Fill all the fields in the form and click submit");
        }
        else{
            setflag(false);
            axios.post("http://localhost:4000/employee/",emp)
            .then((res) => {setemployee([...employee, res.data]); alert(`New employee details added for Id ${res.data.id}`);})
            .catch((err) => {alert("Error in adding employee details")});
            setempid("");
            setempdesg("");
            setempname("");
        }
    }

    //Delete records from db.json and from employee list
    const removeEmployee = (id) => {
        axios.delete("http://localhost:4000/employee/" + id)
        .then((res) => {alert("Employee record deleted for ID : " + id); 
        axios.get("http://localhost:4000/employee/").then((res) => {setemployee(res.data); console.log(res.data);})
    .catch((err) => {console.log(err);})})
        .catch((err) => {alert("Error in deleting the employee record");})
    }

    //update employee details
    const findEmployee = (id) => {
        let emp = employee.find((details) => {
            return(details.id == id);
        })
        console.log(emp);
        setupdatedemp(emp);
    }

    const updateEmployee = () => {
        axios.put("http://localhost:4000/employee/"+ updatedemp.id, updatedemp)
        .then((res) => {
            let index = employee.findIndex((x) => {
                return(x.id == updatedemp.id);
            });
            let temp = [...employee];
            temp[index] = res.data;
            setemployee(temp);
        })
        .catch((err) => console.log(err));
    }

    return(
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Employee Designation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map((details) => {
                        return (<tr key={details.id}>
                            <td>{details.empId}</td>
                            <td>{details.name}</td>
                            <td>{details.designation}</td>
                            <td><button className="btn btn-danger" onClick={() => removeEmployee(details.id)}>Delete</button></td>
                        </tr>
                    );})}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={() => {if(addflag){
                setflag(false);
            }
            else{
                setflag(true);
                setupdateflag(false);
            }}}>Add Employee</button>
            {addflag ? (
                <form onSubmit={addEmployees}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Employee Name :</label>
                        <input className="form-control" type="text" id="name" onChange={(e) => {setempname(e.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="designation">Employee Designation :</label>
                        <input className="form-control" type="text" id="designation" onChange={(e) => setempdesg(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="empid">Employee ID :</label>
                        <input className="form-control" type="text" id="empid" onChange={(e) => setempid(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-info">Submit</button>
                    <div>{message && <label  className="text-danger">{message}</label>}</div>
                </form>
            ) : null}
            <button className="btn btn-primary" onClick={() => {if(updateflag){
                setupdateflag(false);
            }
            else{
                setupdateflag(true);
                setflag(false);
            }}}>Update Employee</button>
            {updateflag ? (
                <form onSubmit={updateEmployee}>
                <div className="form-group">
                    <label className="form-label" htmlFor="EmpId">EmpID :</label>
                    <select className="form-select" onChange={(e) => {findEmployee(e.target.value)}}>
                        <option selected>Select</option>
                        {employee.map((details) =>{
                            return(
                                <option key={details.id} value={details.id}>{details.id}</option>
                            )
                        })}
                    </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Employee Name :</label>
                        <input className="form-control" type="text" id="name" value={updatedemp.name} onChange={(e) => {setupdatedemp({...updatedemp, name : e.target.value})}} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="designation">Employee Designation :</label>
                        <input className="form-control" type="text" id="designation" value={updatedemp.designation} onChange={(e) => {setupdatedemp({...updatedemp, designation : e.target.value})}} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="empid">Employee ID :</label>
                        <input className="form-control" type="text" id="empid" value={updatedemp.empId} onChange={(e) => {setupdatedemp({...updatedemp, empId : e.target.value})}} />
                    </div>
                    <button type="submit" className="btn btn-info">Submit</button>
            </form>
            ) : null}
        </div>
    )


}

export default AddDeleteEmployee;