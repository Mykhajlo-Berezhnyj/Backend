import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 400,
      message: 'Bad request',
      data: {
        message: 'Malformed request body',
        errors: [err.message],
      },
    });
  }

  if (err instanceof HttpError) {
    const data = err.data || null;

    res.status(err.status).json({
      status: err.status,
      message: err.message,
      ...(data ? { data } : {}),
    });
    return;
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};
