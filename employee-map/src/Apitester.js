import { useState, useEffect } from "react";
import axios from "axios";
const Apitester = () => {
  const [employees, setEmployees] = useState([]);
  const addEmployee = () => {
    setEmployees([
      ...employees,
      { empId: 6789, name: "Clara", designation: "TL" },
    ]);
    const addingdata = { "empId": 6789, "name": "Clara", "designation": "TL" };
    axios.post("http://localhost:8000/employee",{ "empId": 1010,
    "name": "Peter Griffin",
    "designation": "Manager",
    "id": "1010" }).then((res) => console.log(res));
    
  };
  useEffect(() => {
    axios.get("http://localhost:8000/employee").then((result) => setEmployees(result.data));
  }, []);
  return (
    <>
      <table style={{ width: "60%" }} className="table">
        <thead className="thead-light">
          <tr>
            <th>EmpID</th>
            <th>Name</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr>
                <td>{employee.empId}</td>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={addEmployee}>Add an Employee</button>
    </>
  );
};
export default Apitester;
