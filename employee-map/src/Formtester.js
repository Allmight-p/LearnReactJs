import { useState } from "react";

let Formtester = () => {

    const [data, setdata] = useState({
        username : "",
        password : ""
    });
    const [status, setstatus] = useState(null);

   const handlechange = (event) => {
    let {name, value} = event.target;
    setdata({...data, [name] : value});
   }

   const handlesubmit = (event) => {
    event.preventDefault();
    if(!data.username || !data.password){
        setstatus(false);
    }
    else{
        setstatus(true);
    }
   }

    return(
        <div>
            <div className="container">
                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Username :</label>
                        <input style={{width : "40%"}} type="text" placeholder="Enter Username" onChange={handlechange} value={data.username} id="username" name="username" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password :</label>
                        <input style={{width : "40%"}} type="password" placeholder="Enter Password" onChange={handlechange} value={data.password} id="password" name="password" className="form-control"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    {status === false && <div className="text-danger">Enter a valid username and password</div>}
                    {status === true && <div className="text-success">Login success.</div>}
                </form>
            </div>
        </div>
    )
}

export default Formtester;