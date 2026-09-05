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

import { authenticate } from '../middleware/authenticate.js';

const notesRouter = Router();

notesRouter.use(authenticate);

notesRouter.get('/', getAllNotesSchema, getAllNotes);
notesRouter.get('/:noteId', noteIdSchema, getNoteById);
notesRouter.post('/', createNoteSchema, createNote);
notesRouter.patch('/:noteId', updateNoteSchema, updateNote);
notesRouter.delete('/:noteId', noteIdSchema, deleteNote);
export default notesRouter;
