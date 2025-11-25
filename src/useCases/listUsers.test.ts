import { ListUsers } from './listUsers';
import { InMemoryUsersRepository } from './adapters/inMemoryUsersRepository';
import { Email } from '../domain/Email';
import { User } from '../domain/User';
import { Password } from '../domain/Password';

describe('List users', () => {
  it('should list empty users', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const listUsers = new ListUsers(usersRepository);
    const users = await listUsers.execute();
    expect(users).toEqual([]);
  });

  it('should list users', async () => {
    const testUsers = [
      User.create({
        name: 'John Doe',
        email: Email.create('john@dominio1.com'),
        password: Password.create('asdfewq19'),
      }),
      User.create({
        name: 'Jane Doe',
        email: Email.create('doe@dominio2.com'),
        password: Password.create('asdfewq19'),
      }),
    ];
    const usersRepository = new InMemoryUsersRepository(testUsers);
    const listUsers = new ListUsers(usersRepository);
    const users = await listUsers.execute();
    expect(users).toEqual(testUsers);
  });
});
