import createHttpError from 'http-errors';

import { Note } from '../models/note.js';

const buildNotesQuery = ({ userId, tag, search }) => {
  const query = Note.find();

  query.where('userId').equals(userId);

  if (tag) {
    query.where('tag').equals(tag);
  }

  if (search) {
    query.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  return query;
};

export const getAllNotes = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const { tag, search } = req.query;
    const skip = (page - 1) * perPage;

    const [notes, totalNotes] = await Promise.all([
      buildNotesQuery({ userId, tag, search }).skip(skip).limit(perPage),
      buildNotesQuery({ userId, tag, search }).countDocuments(),
    ]);

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
      page,
      perPage,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { noteId } = req.params;

    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const note = await Note.create({ ...req.body, userId });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { noteId } = req.params;

    const note = await Note.findOneAndUpdate({ _id: noteId, userId }, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { noteId } = req.params;

    const note = await Note.findOneAndDelete({ _id: noteId, userId });
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
