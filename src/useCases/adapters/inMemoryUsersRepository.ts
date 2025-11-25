import { IUsersRepository } from '../ports/IUsersRepository';
import { User } from '../../domain/User';

export class InMemoryUsersRepository implements IUsersRepository {
  constructor(private readonly users: User[] = []) {
    this.users = users;
  }

  getAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  add(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
}
