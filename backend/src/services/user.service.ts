import User from '../models/user.model';
import { BaseCrudService } from './base/base-crud.service';

export class UserService extends BaseCrudService<typeof User> {
  constructor() {
    super(User);
  }

  async info() {
    return
  }

}