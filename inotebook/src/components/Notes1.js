import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
const Notes = () => {

  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line 
  }, [])
  const ref = useRef(null)
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })
  
  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag})
  }
 
  const handleclick = (e) => {
    e.preventDefault();
    // addNote(note.title, note.description, note.tag)
    setNote({ etitle: "", edescription: "", etag: "" })
  }
  const handlechange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }
  
  return (
    <>
      <AddNote />
      
      {/* <!-- Button trigger modal --> */}
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div className="modal-body">
       {/* addnote form in modal body   */}
       <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" >Title</label>
          <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={handlechange}/>
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="description"  className="form-label"  >Description</label>
          <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={handlechange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag"  className="form-label" >Tag</label>
          <input type="text" className="form-control" id="etag" name='etag'value={note.etag} onChange={handlechange}/>
        </div>
        {/* <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button> */}
      </form>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
      </div>
    </div>
  </div>
</div>

      <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
