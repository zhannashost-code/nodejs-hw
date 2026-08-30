import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const notesRouter = Router();

notesRouter.get('/notes', getAllNotesSchema, getAllNotes);
notesRouter.get('/notes/:noteId', noteIdSchema, getNoteById);
notesRouter.post('/notes', createNoteSchema, createNote);
notesRouter.patch('/notes/:noteId', updateNoteSchema, updateNote);
notesRouter.delete('/notes/:noteId', noteIdSchema, deleteNote);

export default notesRouter;
