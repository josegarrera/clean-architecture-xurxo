import { IUsersRepository } from './ports/IUsersRepository';
import { User } from '../domain/User';

export class AddUser {
  constructor(private usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(user: User) {
    const users = await this.usersRepository.getAll();
    if (users.some((u) => u.email.equals(user.email))) throw new Error('Email already in use');
    if (users.some((u) => u.email.hasSameDomain(user.email))) throw new Error('Domain already in use');
    return await this.usersRepository.add(user);
  }
}
