import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
  function Login() {
  const navigate = useNavigate();
    const [log,setlog]=useState(true);

    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");


    const loginhandler=async(e)=>{

      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/users/login", 
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,password}),
    });

    const data = await response.json();

    console.log(data.message,data.errors);

    if(data.message==="login successfully")
    {
      navigate("/");
      window.location.reload();
      
    }
    }
   


       const signuphandler=async(e)=>{
        e.preventDefault();
      const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      },
      body: JSON.stringify({name,email,password}),
    });

    const data = await response.json();

    console.log(data.message,data.errors);
    navigate("/");
      window.location.reload();

    }


 


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{log?"Login" : "Sign Up"}</h1>

        <form onSubmit={log ? loginhandler:signuphandler} className="auth-form">

            {!log && (
                
           <input
            type="name"
            value={name}
            placeholder="Name"
            className="input-field"
            name="name"
            onChange={(e)=>setname(e.target.value)}
          />
            )
            }
          <input
            type="email"
            value={email}
            placeholder="Email Address"
            className="input-field"
             onChange={(e)=>setemail(e.target.value)}
            name="email"
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            className="input-field"
            onChange={(e)=>setpassword(e.target.value)}
            name="password"
           
          />

          <button type="submit" className="auth-btn">
            {log?"Login" : "Sign Up"}
          </button>
        </form>

        <p className="auth-footer">
          {log ? (
            <>Don't have an account ? <span onClick={() => setlog(false)}>Sign Up</span></>
          ) : (
            <>Already have an account ? <span onClick={() => setlog(true)}>Login</span></>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;