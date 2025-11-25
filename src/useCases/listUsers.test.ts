import { ListUsers } from './listUsers';
import { User } from '../domain/User';
import { IUsersRepository } from './ports/IUsersRepository';
import { Email } from '../domain/Email';
import { Password } from '../domain/Password';

export class MockUsersRepository implements IUsersRepository {
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

describe('List users', () => {
  it('should list users', async () => {
    const usersRepository = new MockUsersRepository();
    const listUsers = new ListUsers(usersRepository);
    const users = await listUsers.execute();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('John Doe');
    expect(users[0].email.value).toBe('email@dominio.com');
    expect(users[0].password.value).toBe('aaaaaa123');
  });
});
