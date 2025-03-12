import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BACKEND_URL =  import.meta.env.VITE_BACKEND_URL;

// Thunks for async operations

// Get all notes
export const getNotes = createAsyncThunk(
  'notes/getNotes', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}api/notes`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// Get a specific note by ID
export const getNote = createAsyncThunk(
  'notes/getNote',
  async (noteId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}api/notes/${noteId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new note
export const createNote = createAsyncThunk(
  'notes/createNote',
  async (notesData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}api/notes`, notesData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update an existing note
export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (notesData, { rejectWithValue }) => {
    console.log(notesData.noteId)
    try {
      const response = await axios.put(`${BACKEND_URL}api/notes/${notesData.noteId}`, notesData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a note by ID
export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (noteId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}api/notes/${noteId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state for the slice
const initialState = {
  notes: [],
  note: null,
  loading: false,
  error: null,
  success: false,
};

// Create the slice
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Get all notes
    builder
      .addCase(getNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
        state.error = null;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get a specific note
      .addCase(getNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.loading = false;
        state.note = action.payload;
        state.error = null;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create a note
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update a note
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notes.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete a note
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter(note => note.id !== action.meta.arg);
        state.success = true;
        state.error = null;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions and reducer
export const { resetStatus } = notesSlice.actions;
export default notesSlice.reducer;
