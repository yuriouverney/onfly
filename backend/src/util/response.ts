import { Response } from 'express';

const ResponseHelpers = {
  ok: (res: Response, body: any): void => {
    const statusCode = 200;
    res.status(statusCode).send(body);
  },

  created: (res: Response, body: any): void => {
    const statusCode = 201;
    res.status(statusCode).send(body);
  },

  updated: (res: Response, body?: any): void => {
    if (body) {
      return ResponseHelpers.ok(res, body);
    } else {
      return ResponseHelpers.end(res);
    }
  },

  deleted: (res: Response, body?: any): void => {
    if (body) {
      return ResponseHelpers.ok(res, [body]);
    } else {
      return ResponseHelpers.end(res);
    }
  },

  end: (res: Response, statusCode: number = 204): void => {
    res.status(statusCode).end();
  },
};

export default ResponseHelpers;
