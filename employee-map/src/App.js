import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  var employees=[
    {name:"govind", empid:1001, pos:"Lead"},
    {name:"brucelee", empid:1002, pos:"Manager"},
    {name:"senthil", empid:1003, pos:"Senior dev"}
  ];
  const [counter, setcounter] = useState(0);
  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>EmployeeID</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => 
        {
          return(
            <tr key={emp.empid}>
              <td>{emp.name}</td>
              <td>{emp.pos}</td>
              <td>{emp.empid}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    <h1>Counter APP</h1>
    <h3>Counter : {counter}</h3>
    <button onClick={() => setcounter(() => counter + 1)}>Click here to increment the number</button>
    </div>
  );
}

export default App;
