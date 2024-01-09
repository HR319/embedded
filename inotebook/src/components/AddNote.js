import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'
const AddNote = () => {
    const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title:"", description:"", tag:""})
  const handleclick = (e) => {
    e.preventDefault(); // will refresh the  page to reflect the new note on frontend
    addNote(note.title, note.description, note.tag) 
    setNote({title:"", description:"", tag:""})
  }
  const handlechange = (e) => {
    setNote({...note, [e.target.name] : e.target.value }) 

  }
  return (
    <div>
      <div className="container my-3">
      <h2>Add a Note</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" >Title</label>
          <input type="text" className="form-control" id="title" value={note.title}  name='title'  aria-describedby="emailHelp" onChange={handlechange}/>
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="description"  className="form-label"  >Description</label>
          <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={handlechange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag"  className="form-label" >Tag</label>
          <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={handlechange}/>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
      </form>
      
      </div>
    </div>
  )
}

export default AddNote
