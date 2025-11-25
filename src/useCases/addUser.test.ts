import { User } from '../domain/User';
import { Email } from '../domain/Email';
import { Password } from '../domain/Password';
import { AddUser } from './addUser';

describe('Add user', () => {
  it('should add a user to the list', async () => {
    const usersRepository = {
      getAll: jest.fn().mockResolvedValue([]),
      add: jest.fn().mockResolvedValue(undefined),
    };

    const addUser = new AddUser(usersRepository);
    const user = User.create({
      name: 'John Doe',
      email: Email.create('email@dominio.com'),
      password: Password.create('aaaaaa123'),
    });

    await addUser.execute(user);

    expect(usersRepository.add).toHaveBeenCalledWith(user);
  });
});
