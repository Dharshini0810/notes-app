const asyncHandler = require("express-async-handler");
const Note = require("../models/notesModel");

//@desc Get all notes for authenticated user
//@URL GET /notes
//route private
const getNotes = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const notes = await Note.find({ user_id : userId });
  if (notes.length == 0) {
    res.status(404);
    throw new Error("Notes not found for this user");
  }
  res.status(200).json(notes);
});

//@desc create a note
//@URL POST /notes
//route private
const createNote = asyncHandler(async (req, res) => {
  console.log("Start of create")
  const { title, content, tags } = req.body;
  if (!title || !content) {
    res.status(400);
    throw new Error("All fields(title and content) are required");
  }
  console.log("First")
  console.log(req.user.id)
  const note = await Note.create({
    user_id: req.user.id,
    title,
    content,
    tags,
  });
  if (!note) {
    res.status(500);
    throw new Error("Note not found");
  }
  console.log("Second")
  res.status(201).json(note);
  console.log("End of create")
});

//@desc Get a note for specific id
//@URL GET /notes/:noteId
//route private
const getNote = asyncHandler(async (req, res) => {
  const {noteId} = req.body;
  const note = await Note.findById(noteId);
  if (!note) {
    res.status(500);
    throw new Error("Unable to fetch a note");
  }
  res.status(200).json(note);
});

//@desc Update a note
//@URL PUT /notes/:noteId
//route private
const updateNote = asyncHandler(async (req, res) => {
  console.log("Start Update")
  console.log(req.body)
  const {noteId} = req.body;
  console.log(noteId)
  const note = await Note.findById(noteId);
  console.log(note)
  console.log("First")
  if (!note) {
    res.status(404);
    throw new Error("Note details not found");
  }

  console.log("Second")
  console.log(req.user.id)
  console.log(note.user_id)
  if (note.user_id.toString() !== req.user.id) {
    console.log("smt")
    res.status(401);
    throw new Error("Notes of one user can't be updated by another user");
  }

  console.log("Third")
  const updateNote = await Note.findByIdAndUpdate(noteId , req.body, {
    new: true,
  });
  console.log("Fourth")
  res.status(200).json(updateNote);
  console.log("End Update")
});

//@desc Delete a note
//@URL DELETE /notes/:noteId
//route private
const deleteNote = asyncHandler(async (req, res) => {
    const noteId = req.params.noteId

    const note = await Note.findById(noteId)
    if(!note){
        res.status(404);
        throw new Error("Note details not found");
    }
    await Note.deleteOne({_id : noteId})
  res.status(200).json(note);
});

module.exports = { getNotes, createNote, getNote, updateNote, deleteNote };
