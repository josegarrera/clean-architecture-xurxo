import { ListUsers } from './listUsers';
import { User } from '../domain/User';
import { IUsersRepository } from './ports/IUsersRepository';

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

describe('List users', () => {
  it('should list users', async () => {
    const usersRepository = new MockUsersRepository();
    const addSpy = jest.spyOn(usersRepository, 'getAll');
    const listUsers = new ListUsers(usersRepository);
    await listUsers.execute();
    expect(addSpy).toHaveBeenCalled();
  });
});
