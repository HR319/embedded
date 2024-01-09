const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Get/fetching all the notes using:GET "/api/notes/fetchallnotes" //login required
// router.use(fetchuser);
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id }); //fetching all notes of a partiuclular user by its id
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

//Add a new using:POST "/api/notes/addnote" //login required
router.post('/addnote', [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    // body('email','Enter a valid email').isEmail(),
    body('description', 'description must be at least 5 chatctres').isLength({ min: 5 }),
], fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    //if there are errors, returnn bad req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await note.save();
        res.json(savedNotes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

//Updating an existing note using : PUT "api/auth/updatenote" - login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        //not updating date for now
        //find the note to be updated & update it
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("not found") }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

//Deleting an existing note using : DELETE "api/auth/deletenote" - login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //not updating date for now
        //find the note to be updated & update it
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not found") }

        //allow deletion if user owns this note
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        // res.json({note});
        res.json({ "Success": "Note has been deleted", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

module.exports = router;