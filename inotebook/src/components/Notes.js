import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
const Notes = () => {

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line 
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ id:"", etitle: "", edescription: "", etag: "" })
  
  const updateNote = (currentnote) => {
     ref.current.click();
    setNote({id:currentnote._id, etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag})
    
  }

  const handleclick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    // e.preventDefault();
    // addNote(note.title, note.description, note.tag)
    //setNote({ etitle: "", edescription: "", etag: "" })
  }
  const handlechange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }
  
  return (
    <>
      <AddNote />
      {/* modal code start from here */}
      <button ref={ref}  type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                {/* <span aria-hidden="true">&times;</span> */}
              </button>
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
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
            </div>

          </div>
        </div>
      </div>
{/* modal coded ended here */}

      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'No notes to display'}</div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
