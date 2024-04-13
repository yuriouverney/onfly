import { Request, Response, NextFunction } from 'express';
interface HttpError extends Error {
  statusCode: number;
}

function wrapAsync(fn: (req: Request, res: Response, next?: NextFunction) => Promise<any>) {
  return function(req: Request, res: Response, next: NextFunction): void {
    fn(req, res, next).catch((err: HttpError) => {
      res.status(err.statusCode || 500).json({
        error: {
          message: err.message || 'An unexpected error has occurred.',
        },
      });
    });
  };
}

export default wrapAsync;
