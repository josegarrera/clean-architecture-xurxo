import { Email } from '../domain/Email';
import { Password } from '../domain/Password';
import { User } from '../domain/User';
import { AddUser } from '../useCases/addUser';
import { ListUsers } from '../useCases/listUsers';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class ApiPresenter {
  constructor(
    private listUsers: ListUsers,
    private addUser: AddUser
  ) {}

  async getUsers(): Promise<ApiResponse<UserDTO[]>> {
    try {
      const users = await this.listUsers.execute();
      const userDTOs: UserDTO[] = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email.value,
      }));
      return { success: true, data: userDTOs };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch users',
      };
    }
  }

  async createUser(dto: CreateUserDTO): Promise<ApiResponse<UserDTO>> {
    const errors: string[] = [];

    if (!dto.name || dto.name.trim() === '') {
      errors.push('Name is required');
    }

    let email: Email | null = null;
    let password: Password | null = null;

    try {
      email = Email.create(dto.email);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Invalid email');
    }

    try {
      password = Password.create(dto.password);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Invalid password');
    }

    if (errors.length > 0) {
      return { success: false, error: errors.join(', ') };
    }

    try {
      const user = User.create({
        name: dto.name.trim(),
        email: email!,
        password: password!,
      });
      await this.addUser.execute(user);
      return {
        success: true,
        data: { id: user.id, name: user.name, email: user.email.value },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create user',
      };
    }
  }
}
