import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Login({ setIslogin }) {
  const navigate = useNavigate();

  const [log, setlog] = useState(true);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);

  // LOGIN
  const loginhandler = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://notesappx2.onrender.com/api/users/login",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await response.json();

    console.log(data.message);

    if (data.message === "login successfully") {
      toast.success("Login Successful 🚀");
      setIslogin(true);
      navigate("/");
    } else {
      const err = data.message;
      toast.error(err);
    }
  };

  // SIGNUP
  const signuphandler = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://notesappx2.onrender.com/api/users/signup",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      },
    );

    const data = await response.json();

    console.log(data.message);

    if (data.message === "signup successfully") {
      toast.success("Signup Successful 🚀");
      setlog(true);
      setname("");
      setemail("");
      setpassword("");
    } else {
      const err = data.message;
      toast.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{log ? "Login" : "Sign Up"}</h1>
        {/* <p>{data.message}</p> */}
        <form
          onSubmit={log ? loginhandler : signuphandler}
          className="auth-form"
        >
          {!log && (
            <>
              {/* <span className="material-icons icon">person</span> */}
              <input
                type="text"
                value={name}
                placeholder="Name"
                className="input-field"
                onChange={(e) => setname(e.target.value)}
              />
            </>
          )}

          {/* <span className="material-icons icon">email</span> */}
          <input
            type="email"
            value={email}
            placeholder="Email Address"
            className="input-field"
            onChange={(e) => setemail(e.target.value)}
          />

          <div className="pwd-box">
            <input
              type={show ? "text" : "password"}
              value={password}
              placeholder="Password"
              className="input-field"
              onChange={(e) => setpassword(e.target.value)}
            />

            <span className="eye" onClick={() => setShow(!show)}>
              <span className="material-icons">
                {show ? "visibility" : "visibility_off"}
              </span>
            </span>
          </div>

          <button type="submit" className="auth-btn">
            {log ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="auth-footer">
          {log ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setlog(false)}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setlog(true)}>Login</span>
            </>
          )}
           <p>------------------or----------------</p>
     {/* <button
            onClick={() => {
              window.location.href =
                "https://notesappx2.onrender.com/auth/google";
            }}
          >
            Login with Google
          </button> */}
        </p>
      </div>
    </div>
  );
}

export default Login;
