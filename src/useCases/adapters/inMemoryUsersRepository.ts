import { IUsersRepository } from '../ports/IUsersRepository';
import { User } from '../../domain/User';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  getAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  add(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
}
