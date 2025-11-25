import { ListUsers } from './listUsers';
import { InMemoryUsersRepository } from './adapters/inMemoryUsersRepository';

describe('List users', () => {
  it('should list users', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const listUsers = new ListUsers(usersRepository);
    const users = await listUsers.execute();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('John Doe');
    expect(users[0].email.value).toBe('email@dominio.com');
    expect(users[0].password.value).toBe('aaaaaa123');
  });
});
