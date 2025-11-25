import { IUsersRepository } from './ports/IUsersRepository';
import { User } from '../domain/User';

export class AddUser {
  constructor(private usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(user: User) {
    return await this.usersRepository.add(user);
  }
}
