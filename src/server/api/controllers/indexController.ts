import { NextFunction, Request, Response } from 'express';

export default function(req: Request, res: Response, next: NextFunction) {
  res.json([{
    id: 1,
    username: "samsepi0l"
  }, {
    id: 2,
    username: "D0loresH4ze"
  }]);
  next();
};
