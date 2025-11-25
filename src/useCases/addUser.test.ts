import { User } from '../domain/User';
import { Email } from '../domain/Email';
import { Password } from '../domain/Password';
import { AddUser } from './addUser';
import { InMemoryUsersRepository } from './adapters/inMemoryUsersRepository';

describe('Add user', () => {
  it('should add a user to the list', async () => {
    const usersRepository = new InMemoryUsersRepository();

    const addUser = new AddUser(usersRepository);
    const user = User.create({
      name: 'John Doe',
      email: Email.create('email@dominio.com'),
      password: Password.create('aaaaaa123'),
    });

    await addUser.execute(user);

    const users = await usersRepository.getAll();
    expect(users).toEqual([user]);
  });

  it('should not add a user if the email is already in use', async () => {
    const alreadyExistingUser = User.create({
      name: 'John Doe',
      email: Email.create('email@dominio.com'),
      password: Password.create('aaaaaa123'),
    });
    const usersRepository = new InMemoryUsersRepository([alreadyExistingUser]);
    const addUser = new AddUser(usersRepository);
    await expect(async () => addUser.execute(alreadyExistingUser)).rejects.toThrow('Email already in use');
  });

  it('should not add a user if the domain is already in use', async () => {
    const alreadyExistingUser = User.create({
      name: 'John Doe',
      email: Email.create('email1@dominio.com'),
      password: Password.create('aaaaaa123'),
    });
    const usersRepository = new InMemoryUsersRepository([alreadyExistingUser]);
    const newUser = User.create({
      name: 'John Doe',
      email: Email.create('email2@dominio.com'),
      password: Password.create('aaaaaa123'),
    });
    const addUser = new AddUser(usersRepository);
    await expect(async () => addUser.execute(newUser)).rejects.toThrow('Domain already in use');
  });
});
