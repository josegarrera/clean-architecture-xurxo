import { User } from '../../domain/User';

export interface IUsersRepository {
  getAll(): Promise<User[]>;
  add(user: User): Promise<void>;
}
