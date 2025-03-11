/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import { createNote, getNotes, updateNote } from "../../features/notes/notesSlice";


const AddEditNotes = ({ noteData, type, onClose }) => {

  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const dispatch = useDispatch()
  
  //Add new note
  const addNewNote = () => {
    const newNote = {
      title,
      content,
      tags
    }
      
    dispatch(createNote(newNote)).unwrap()
    .then(() =>{
      onClose()
      dispatch(getNotes())
    })
    .catch(() => {
      setError("Failed to add note. Please try again.");
    });
  };

  //Edit Note
  const editNote = () => {
    const updatedNote = {
      noteId : noteData?._id,
      title,
      content,
      tags,
    };
    dispatch(updateNote(updatedNote)).unwrap()
    .then(() =>{
      onClose()
      dispatch(getNotes())
    })
    .catch(() =>{
      setError("Failed to update the note.Please try again")
    })
  };


  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title.");
      return;
    }
    if (!content) {
      setError("Please enter the content.");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="clear-both">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center float-right bg-slate-50 hover:bg-slate-100"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2 clear-both">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none bg-slate-50 p-1"
          placeholder="Go to Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm bg-slate-50 text-slate-950 outline-none p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">TAGS</label>
      </div>

      <TagInput tags={tags} setTags={setTags} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        className="btn-primary hover:bg-blue-600 mt-5 p-3"
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  );
};

export default AddEditNotes;
