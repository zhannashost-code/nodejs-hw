import { isHttpError } from 'http-errors';
import { MulterError } from 'multer';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof MulterError) {
    res.status(400).json({
      message:
        error.code === 'LIMIT_FILE_SIZE'
          ? 'File is too large, max size is 2MB'
          : error.message,
    });
    return;
  }

  if (isHttpError(error)) {
    res.status(error.status).json({
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    message: error.message,
  });
};
