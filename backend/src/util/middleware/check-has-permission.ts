import { Request, Response, NextFunction } from 'express';

const checkHasPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'User not found in request. Authentication required.' });
    }

    if (!user.permissions.includes(permission)) {
      return res.status(401).json({ message: 'Access denied. You do not have the required permission.' });
    }

    next();
  };
};

export { checkHasPermission };
