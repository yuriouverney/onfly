import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../../config/config';
import Profile from '../../models/profile.model';
import Permission from '../../models/permission.model';
import User from '../../models/user.model';
import { UserService } from '../../services/user.service';

dotenv.config();

interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header not found' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.security.jwtSignKey) as DecodedToken;
    const userService = new UserService();
    const filter = {
      attributes: ['id', 'name'],
      include: [
        {
          model: Profile,
          attributes: ['description'],
          include: [{ model: Permission, attributes: ['name'] }],
        },
      ],
    };

    const user = (await userService.findById(decoded.id, filter)) as User;

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const permissionsName = user.Profile.Permissions.map((permission) => permission.name);

    const reqUser = {
      name: user.name,
      id: user.id,
      role: user.Profile.description,
      permissions: permissionsName,
    };

    req.user = reqUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const authorize = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Authorization header not found' });
    }
    next();
  };
};

export { verifyToken, authorize };
