import { User } from '../domain/User';
import { IUsersRepository } from './ports/IUsersRepository';
import { Email } from '../domain/Email';
import { Password } from '../domain/Password';
import { AddUser } from './addUser';

export class MockUsersRepository implements IUsersRepository {
  private users: User[] = [];

  getAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  add(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
}

describe('Add user', () => {
  it('should add a user to the list', async () => {
    const usersRepository = new MockUsersRepository();
    const addSpy = jest.spyOn(usersRepository, 'add');
    const addUser = new AddUser(usersRepository);
    const user = User.create({
      name: 'John Doe',
      email: Email.create('email@dominio.com'),
      password: Password.create('aaaaaa123'),
    });
    await addUser.execute(user);
    expect(addSpy).toHaveBeenCalledWith(user);
  });

  it('should throw an error when adding a user with the same email', async () => {
    const usersRepository = new MockUsersRepository();
    const firstUser = User.create({
      name: 'John Doe',
      email: Email.create('email@dominio.com'),
      password: Password.create('aaaaaa123'),
    });
    const addUser = new AddUser(usersRepository);
    await addUser.execute(firstUser);
    const secondUser = User.create({
      name: 'John Doe',
      email: Email.create('email@dominio.com'),
      password: Password.create('aaaaaa123'),
    });
    await expect(addUser.execute(secondUser)).rejects.toThrow('Email already in use');
  });

  it('should throw an error when adding a user with an already registered domain', async () => {
    const usersRepository = new MockUsersRepository();
    const firstUser = User.create({
      name: 'John Doe',
      email: Email.create('email@dominio.com'),
      password: Password.create('aaaaaa123'),
    });
    const addUser = new AddUser(usersRepository);
    await addUser.execute(firstUser);
    const secondUser = User.create({
      name: 'John Doe',
      email: Email.create('email2@dominio.com'),
      password: Password.create('aaaaaa123'),
    });
    await expect(addUser.execute(secondUser)).rejects.toThrow('Domain already in use');
  });
});
