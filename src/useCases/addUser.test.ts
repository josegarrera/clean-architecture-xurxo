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
});
