import { useState } from "react";
import "../App.css";
// import { FaEdit, FaTrash, MdDateRange, FaCalendarAlt } from "react-icons/fa";
// import Signup from "./Signup";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function NotesApp({ setIslogin }) {
  const navigate = useNavigate();
  // const navigate = useNavigate();\

  // const [dark, setDark] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editindex, seteditIndex] = useState(null);
  const [showForm, setshowForm] = useState(false);
  const [list, setList] = useState([]);
  const [ide, setide] = useState("");
   // const [search, snote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [drop,setdrop]=useState(false);
  const [dark,setdark]=useState(true);
  const [del,setdel]=useState(false);
  // const [conf,setconf]=useState(false);

  console.log(typeof ide);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  console.log(form);

  const subHandler = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };






    const getdata = async () => {
    const response = await fetch(
     "https://notesappx2.onrender.com/api/note",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ date: date }),
      },
    );
    const data = await response.json();
    console.log(data);
    setList(data.notes);
  };




  
  const addNote = async (e, id) => {
    e.preventDefault();
    setshowForm(false);
     
    if (edit) {
      //first update then send new updated data to backend
      setList((prev) =>
        prev.map((item, i) => (i === editindex ? { ...item, ...form } : item)),
      );

      const response = await fetch(
        `https://notesappx2.onrender.com/api/note/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ide }),
        },
      );

      const data = await response.json();

      console.log("edit data=", data);
      await getdata();
      setEdit(false);
    } else {
      const response = await fetch(
        "https://notesappx2.onrender.com/api/note",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      console.log(data);
      await getdata();
      // setList(prev=>[...prev,form]);
    }

    setForm({
      title: "",
      description: "",
    });
  };

  const editNote = (index, id) => {
    setEdit(true);
    setshowForm(true);
    setForm(list[index]);
    seteditIndex(index);
    setide(id);
  };






  
  const deleteNote = async (id, index) => {
     // const confirmDelete = window.confirm("Are you sure you want to delete?");
    // setdel(true);
   const result = await Swal.fire({
  title: "Delete Note?",
  text: "Are you sure?",
  showCancelButton: true,
});

if (result.isConfirmed) {  
    setList(list.filter((item, i) => i !== index));
    
    const response = await fetch(
      `https://notesappx2.onrender.com/api/note/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      },
    );

    const data = await response.json();

    console.log(data);
    await getdata();
}
    
  };

   const searchnote = async (e) => {
    // const value = e.target.value;

    // setsearch(value);
     const search = e.target.value;
     
     
    const response = await fetch(
      `https://notesappx2.onrender.com/api/note/search?search=${search}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          
        },
        // body: JSON.stringify({ search: search }),
      },
    );

    const data = await response.json();
    console.log(data.notes);
    setList(data.notes);
    
  };


    const searchdate = async (e) => {
      const date=e.target.value;
    const response = await fetch(
     `https://notesappx2.onrender.com/api/note/date?date=${date}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ date: date }),
      },
    );
    const data = await response.json();
    console.log(data);
    setList(data.notes);
  };

  
// useEffect(() => {
//     searchnote();
//   }, [search]);



//   useEffect(() => {
//     getdata();
//   }, [date]);

    useEffect(() => {
    getdata();
  }, []);

  const logouthandler = async () => {
    const response = await fetch(
      "https://notesappx2.onrender.com/api/users/islogout",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(),
      },
    );

    const data = await response.json();
    console.log(data.message);
    // if (data.message === "logout successfully") {
    //   setIslogin(false);
    //   navigate("/");

    //   // window.location.reload();
    // }


      if (data.message === "logout successfully") {
     
    toast.success("Logout Successful 👋");

    setTimeout(() => {
      setIslogin(false);
      navigate("/");
    }, 1500);
  }
  };


  const dropbox=()=>{
    setdrop(!drop);
  }

  return (
    <>
      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="header-bar">
            {/* Logo */}
            {/* <div className="logo">
              <div className="logo-box">N</div>
              <h1>Notes App</h1>
            </div> */}

            <div className="logo">
  <button onClick={dropbox}
  className="menu-btn"
  style={{
    fontSize: "2rem",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  }}
>
  ☰
</button>

  <div className="logo-box">N</div>
  <h1>Notes App</h1>
</div>

            {/* Add Button */}
            {/* <button onClick={() => setshowForm(true)} className="add-btn">
              + Add Notes
            </button> */}
            <button
              onClick={() => {
                setshowForm(true);
                setEdit(false); // ✅ important fix
                setForm({ title: "", description: "" }); // optional clean form
              }}
              className="add-btn"
            >
              + Add Notes
            </button>

            {/* Nav */}
            {drop &&
              <ul className="nav-links">
              {/* <li className="active">🏠 All Notes</li> */}
              {/* <li>📌 Pinned</li>
              <li>📦 Archive</li>
              <li>🗑 Trash</li> */}
            </ul>
            
            }
            
          </div>

          {/* Bottom */}

          {drop && 

            <div className="bottom-section">
            <button className="theme-btn" onClick={()=>setdark(!dark)}> {dark ? "☀️ Light Theme" : "🌙 Dark Theme"}</button>

            <button onClick={logouthandler} className="logout-btn">
              Logout
            </button>
          </div>
        
          }
          
        </aside>

        {/* Main */}
        <main className="main" style={dark ?  {} : {background:"white"} }>
          {/* Topbar */}
          <div className="topbar">
            <h2 style={dark ? {} : {color:"black"}}>My Notes</h2>
            {/* dateeeeeeeeeeeeee settting */}
             {/* <input
              type="date"
        
              onChange={(e) => searchdate(e)}
            />  */}


            <input
  type="text"
  placeholder="DD-MM-YYYY"
  onFocus={(e) => (e.target.type = "date")}
  onBlur={(e) => {
    if (!e.target.value) e.target.type = "text";
  }}
  onChange={searchdate}
/>

          
 








            

             <input
              
              onChange={(e)=>searchnote(e)}
              type="text"
              placeholder="Search notes..."
            />
          </div>

          {/* Notes */}

          {list?.map((item, index) => (
            <div key={index} className="notes-container">
              <div className="note-card">
                <h3>{item.title}</h3>

                <p>{item.description}.</p>

                <div className="card-footer">
                  <span>
                     {new Date(item.createdAt).toISOString().split("T")[0]}
                  </span>

                  <div>
                    {/* <button
                      onClick={() => editNote(index, item._id)}
                      className="edit-btn"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteNote(item._id, index)}
                      className="delete-btn"
                    >
                      Delete
                    </button> */}

                    <button
                      onClick={() => editNote(index, item._id)}
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => deleteNote(item._id, index)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>




  {/* -----------------------------------------------------------------------------------------------------------------------------------------------------------------------    */}
      {/* FORM MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <div className="form-container">
          <h2>
  {del
    ? "Are you sure you want to delete this task?"
    : edit
    ? "Edit Note"
    : "Add Note"}
</h2>

            <form onSubmit={addNote} className="note-form">
              { !del &&
                  <input
                name="title"
                type="text"
                value={form.title}
                onChange={(e) => subHandler(e)}
                placeholder="Enter title"
              />
              }
             
           { !del &&
              <textarea
                name="description"
                value={form.description}
                onChange={(e) => subHandler(e)}
                placeholder="Enter description"
              ></textarea>
           }

          <button type="submit">
            {del ? "OK" : edit ? "Update" : "Add"}
          </button>

              <p
                onClick={() => {
                  setshowForm(false);
                  setEdit(false);
                  setForm({});
                }}
                className="cancel"
              >
                Cancel
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


export default NotesApp;
