import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesApp from "./components/NotesApp";
import Login from "./components/Login";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
function App() {
  const [islogin, setIslogin] = useState(null);
  //  const navigate = useNavigate();
  useEffect(() => {
    const checklogin = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/islogin", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });

        const data = await response.json();
        console.log(data.message);

    if(data.message === "already login") 
      {
          console.log("already login");
          setIslogin(true);
        } 
        
        else 
       {
          setIslogin(false);
        }
      } catch (error) {
        console.error(error);
        setIslogin(false);
      }
    };

    checklogin();
  }, []);


  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={islogin ? <NotesApp/> : <Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 