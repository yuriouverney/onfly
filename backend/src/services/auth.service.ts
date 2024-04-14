import jwt from 'jsonwebtoken';
import { ErrorMessages, ThrowError } from '../util/error';
import User from '../models/user.model';
import config from '../config/config';

class AuthService {
  public static async login(username: string, password: string): Promise<string> {

    if (!username || !password) throw new Error(ErrorMessages.authentication.invalidCredentials)

    password = password.toString()

    try {

      const user = await User.scope('withPass').findOne({ where: { user: username } });

      if (!user) {
        return ThrowError.throwAuthenticationError(ErrorMessages.authentication.invalidCredentials);
      }

      if (user && !user.active) {
        return ThrowError.throwAuthenticationError(ErrorMessages.authentication.inactiveUser);
      }

      const passwordValid = await user.validatePassword(password);

      if (!passwordValid) {
        return ThrowError.throwAuthenticationError(ErrorMessages.authentication.invalidCredentials);
      }
      
      const token = jwt.sign({ id: user.id }, config.security.jwtSignKey, { expiresIn: config.security.jwtAccessTokenExpiresIn });

      return token;
    } catch (error) {
      throw error;
    }
  }

}

export default AuthService;