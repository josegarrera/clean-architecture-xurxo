import { IUsersRepository } from './ports/IUsersRepository';

export class ListUsers {
  constructor(private usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute() {
    return await this.usersRepository.getAll();
  }
}
