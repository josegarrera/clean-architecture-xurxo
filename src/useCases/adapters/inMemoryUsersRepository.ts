import { IUsersRepository } from '../ports/IUsersRepository';
import { User } from '../../domain/User';
import { Email } from '../../domain/Email';
import { Password } from '../../domain/Password';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [
    User.create({ name: 'John Doe', email: Email.create('email@dominio.com'), password: Password.create('aaaaaa123') }),
  ];

  getAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  add(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
}
