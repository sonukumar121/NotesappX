import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotesApp from "./components/NotesApp";
import Login from "./components/Login";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
function App() {
 const [islogin, setIslogin] = useState(false);
const [loading, setLoading] = useState(true);
  //  const navigate = useNavigate();
useEffect(() => {
  const checklogin = async () => {
    try {
      const response = await fetch(
        "https://notesappx2.onrender.com/api/users/islogin",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.message === "already login") {
        setIslogin(true);
      } else {
        setIslogin(false);
      }
    } catch (error) {
      console.error(error);
      setIslogin(false);
    } finally {
      setLoading(false);
    }
  };

  checklogin();
}, []);


  
  return (
   <>
     <ToastContainer style={{ zIndex: 99999 }} 
     
  position="top-right"
  autoClose={1000}
  hideProgressBar
  newestOnTop
  closeOnClick
  draggable={false}
  theme="dark"
/>
      
    <BrowserRouter>
      <Routes>
      <Route path="/" element={islogin ? <NotesApp setIslogin={setIslogin}/> : <Login setIslogin={setIslogin}/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
 
