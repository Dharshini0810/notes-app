import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";

import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import AddEditNotes from "./AddEditNotes";
import { deleteNote, getNotes,resetStatus } from "../../features/notes/notesSlice"

const Home = () => {
  const dispatch = useDispatch();
  const { notes, loading, error,success } = useSelector((state) => state.notes);

  const [openAddEditNotes, setOpenAddEditNotes] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  useEffect(() =>{
    dispatch(getNotes())
  },[dispatch])

    // Reset success and error messages after an operation
    useEffect(() => {
      if (success || error) {
        const timer = setTimeout(() => {
          dispatch(resetStatus());
        }, 3000); // Reset status after 3 seconds
        return () => clearTimeout(timer);
      }
    }, [success, error, dispatch]);

  const onClose = () => {
    setOpenAddEditNotes({ isShown: false, type: "add", data: null });
  };

  const onDeleteHandler = (noteId) => {
    dispatch(deleteNote(noteId))
      .unwrap()
      .then(() => {
        console.log(`Note with id ${noteId} deleted successfully.`);
        dispatch(getNotes())
      })
      .catch((error) => {
        console.error("Failed to delete the note:", error);
      });
  };

  // Handle loading and error states
  if (loading) return <p>Loading notes...</p>;

  return (
    <>
      <Navbar />
      {success && <p className="flex justify-center items-center  text-green-500">Operation Successful</p>}
      {error && <div className="flex items-center text-red-500 p-1">
        <h2>{error.title}</h2>
        <p>{error.message}</p>
        </div>}
      <div className="container">
        <div className="flex flex-wrap gap-3  m-8">
          {/* Render NoteCards dynamically based on fetched notes */}
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={note.date}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => {
                setOpenAddEditNotes({ isShown: true, type: "edit", data: note });
              }}
              onDelete={() =>{
                onDeleteHandler(note._id)
              }}
              onPinNote={() => {
                // Add pin functionality here
              }}
            />
          ))}
        </div>
      </div>

      {/* Add Note Button */}
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 float-right m-5 "
        onClick={() => {
          setOpenAddEditNotes({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      {/* Modal for Add/Edit Notes */}
      <Modal
        isOpen={openAddEditNotes.isShown}
        onRequestClose={onClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel="Note Modal"
        className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white max-h-[90vh] mx-auto mt-14 sm:mt-10 md:mt-8 lg:mt-6 rounded p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditNotes.type}
          noteData={openAddEditNotes.data}
          onClose={onClose}
        />
      </Modal>
    </>
  );
};

export default Home;
