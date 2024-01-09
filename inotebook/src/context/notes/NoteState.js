// import NoteContext from "./noteContext";
// import { useState } from "react";

// const NoteState= (props) => {
//         const s1 = {
//             "name" : "HR",
//             "class" : "5b"
//         }
//         const [state, setState] = useState(s1);
//         const update = () => {
//             setTimeout(() => {
//                 setState ( {
//                     "name" : "lery",
//                     "class" : "5c"
//                 })
//             }, 1000)
//         }
//     return (
//             <NoteContext.Provider value={{state:state, update:update}}>
//                 {props.childern}
//             </NoteContext.Provider>//notecontext provides this value
//     )
// }

// export default NoteState;

import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    // const s1 = {
    //     "name": "Harry",
    //     "class": "5b"
    // }
    // const [state, setState] = useState(s1);

    // const update = ()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name": "Larry",
    //             "class": "10b"
    //         })
    //     }, 1000);
    // }
    const host = "http://localhost:5000"
    const n1 = []
      const [notes, setNotes] = useState(n1);

      //get/fetch all Note
      const getNotes = async () => {
        // API call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ZjFkM2RlODVhZjczZDhmZjY1MDcxIn0sImlhdCI6MTY4NzEwNTM3N30.SNcEdGQqKuSFFp5QWQaKqIzDHEWSrXGzYr7fvKiE4hk"
          },
        });
        const json = await response.json(); 
        // console.log(response);
        // console.log(json);
        setNotes(json);
      }
      
      //Add a Note
      const addNote = async (title, description, tag) => {
        // note = null remain API call 
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ZjFkM2RlODVhZjczZDhmZjY1MDcxIn0sImlhdCI6MTY4NzEwNTM3N30.SNcEdGQqKuSFFp5QWQaKqIzDHEWSrXGzYr7fvKiE4hk"
          },
          body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note));
      }
      //Delete a Note
      const deleteNote = async (id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ZjFkM2RlODVhZjczZDhmZjY1MDcxIn0sImlhdCI6MTY4NzEwNTM3N30.SNcEdGQqKuSFFp5QWQaKqIzDHEWSrXGzYr7fvKiE4hk"
          },
          // body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });
        const json = await response.json();

         const newNotes = notes.filter((note)=>{ return note._id!==id}) 
        //will filter notes array
        setNotes(newNotes)
      }
      //Edit a Note
      const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ZjFkM2RlODVhZjczZDhmZjY1MDcxIn0sImlhdCI6MTY4NzEwNTM3N30.SNcEdGQqKuSFFp5QWQaKqIzDHEWSrXGzYr7fvKiE4hk"
          },
          body: JSON.stringify({title, description, tag}), // body data type must be matched with "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects

        let newNotes = JSON.parse(JSON.stringify(notes)) // react will not set newstate directly
        // code to edit on UI/screen
        for(let index=0; index<notes.length; index++){
          const element = notes[index];
          if(element._id === id){
            newNotes[index].title= title;
            newNotes[index].description= description;
            newNotes[index].tag= tag;
            break;
          }
          
        }
        setNotes(newNotes);
      }
      
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;