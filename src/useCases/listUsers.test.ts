import { ListUsers } from './listUsers';

describe('List users', () => {
  it('should list users', async () => {
    const usersRepository = {
      getAll: jest.fn().mockResolvedValue([]),
      add: jest.fn().mockResolvedValue(undefined),
    };
    const listUsers = new ListUsers(usersRepository);
    await listUsers.execute();
    expect(usersRepository.getAll).toHaveBeenCalled();
  });
});
