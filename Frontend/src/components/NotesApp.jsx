import { useState } from "react";
import "../App.css";
// import Signup from "./Signup";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function NotesApp() {

   const navigate = useNavigate();
  // const navigate = useNavigate();\

  // const [dark, setDark] = useState(false);
  
  const [edit, setEdit] = useState(false);
  const [editindex, seteditIndex] = useState(null);
  const [showForm, setshowForm] = useState(false);
  const [list, setList] = useState([]);
  const [ide,setide]=useState("");
  const [search,setsearch]=useState("");

  console.log(typeof(ide));

  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  console.log(form);

  const subHandler = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };





  const getform = async () => {
    const response = await fetch("http://localhost:5000/api/note", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(),
    });
    const data = await response.json();
    console.log(data);
    setList(data.notes);


  };












  const addNote = async (e,id) => {
    e.preventDefault();

    setshowForm(false);

    if (edit) 
      {
        //first update then send new updated data to backend
        setList((prev) =>
        prev.map((item, i) => (i === editindex ? { ...item, ...form } : item))
        
      
      );
   
      

      const response = await fetch(`http://localhost:5000/api/note/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({ide}),
    });

    const data = await response.json();

    console.log("edit data=" ,data);
    await getform();
    setEdit(false);
    
      
     
    } 
    
    
    
    
    
    else {
      const response = await fetch("http://localhost:5000/api/note", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
         
          
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      console.log(data);
      await getform();
      // setList(prev=>[...prev,form]);
    }

    setForm({
      title: "",
      description: "",
    });
  };

  const editNote = (index,id) => {
    setEdit(true);
    setshowForm(true);
    setForm(list[index]);
    seteditIndex(index);
    setide(id);

  };

  const deleteNote = async (id, index) => {
    setList(list.filter((item, i) => i !== index));

    const response = await fetch(`http://localhost:5000/api/note/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    console.log(data);
    await getform();
  };

  
  const searchnote = async (e) => {
  const value = e.target.value;

  setsearch(value);

  const response = await fetch("http://localhost:5000/api/note/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include"
    },
    body: JSON.stringify({ search: value }),
  });

  const data = await response.json();

  setList(data.note);
};

    useEffect(() => {
      getform();
  }, []);





  const logouthandler=async()=>{
      
  const response = await fetch("http://localhost:5000/api/users/islogout", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(),
  });
    
  const data = await response.json();
   console.log(data.message);
   if(data.message==="logout sucessfully")
   {
     navigate("/");
     window.location.reload();
   }
  
  }


  return (
    <>
      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            {/* Logo */}
            <div className="logo">
              <div className="logo-box">N</div>
              <h1>Notes App</h1>
            </div>

            {/* Add Button */}
            <button onClick={() => setshowForm(true)} className="add-btn">
              + Add Notes
            </button>

            {/* Nav */}
            <ul className="nav-links">
              <li className="active">🏠 All Notes</li>
              <li>📌 Pinned</li>
              <li>📦 Archive</li>
              <li>🗑 Trash</li>
            </ul>
          </div>

          {/* Bottom */}
          <div className="bottom-section">
            <button className="theme-btn">🌙 Dark Theme</button>

            <button onClick={logouthandler} className="logout-btn">Logout</button>
          </div>
        </aside>

        {/* Main */}
        <main className="main">
          {/* Topbar */}
          <div className="topbar">
            <h2>My Notes</h2>

            <input value={search} onChange={(e)=>{searchnote(e)}} type="text" placeholder="Search notes..." />
          </div>

          {/* Notes */}

          {list.map((item, index) => (
            <div key={index} className="notes-container">
              <div className="note-card">
                <h3>{item.title}</h3>

                <p>{item.description}.</p>

                <div className="card-footer">
                  <span>Today</span>

                  <div>
                    <button
                      onClick={() => editNote(index,item._id)}
                      className="edit-btn"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteNote(item._id, index)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
      {/* FORM MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <div className="form-container">
            <h2>{edit ? "Edit Note" : "Add Note"}</h2>

            <form onSubmit={addNote} className="note-form">
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={(e) => subHandler(e)}
                placeholder="Enter title"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={(e) => subHandler(e)}
                placeholder="Enter description"
              ></textarea>

              <button type="submit">{edit ? "Update" : "Add"}</button>

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
