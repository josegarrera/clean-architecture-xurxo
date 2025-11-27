import { Email } from '../domain/Email';
import { Password } from '../domain/Password';
import { User } from '../domain/User';
import { AddUser } from '../useCases/addUser';
import { ListUsers } from '../useCases/listUsers';
import { DeclarativePresenter, PresenterState, UserDTO, UserFormData } from './ports/declarativePresenterInterface';

export class DeclarativePresenterImpl implements DeclarativePresenter {
  private state: PresenterState = {
    users: [],
    errors: [],
    isLoading: false,
    successMessage: null,
  };

  private subscribers: Set<(state: PresenterState) => void> = new Set();

  constructor(
    private listUsers: ListUsers,
    private addUser: AddUser
  ) {}

  getState(): PresenterState {
    return { ...this.state };
  }

  subscribe(callback: (state: PresenterState) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notify(): void {
    const currentState = this.getState();
    this.subscribers.forEach((callback) => callback(currentState));
  }

  private setState(partial: Partial<PresenterState>): void {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  async loadUsers(): Promise<void> {
    this.setState({ isLoading: true });
    try {
      const users = await this.listUsers.execute();
      const userDTOs: UserDTO[] = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email.value,
      }));
      this.setState({ users: userDTOs, isLoading: false });
    } catch {
      this.setState({ errors: ['Failed to load users'], isLoading: false });
    }
  }

  async createUser(data: UserFormData): Promise<boolean> {
    this.setState({ isLoading: true, errors: [], successMessage: null });

    const errors: string[] = [];
    let email: Email | null = null;
    let password: Password | null = null;

    if (!data.name || data.name.trim() === '') {
      errors.push('Name is required');
    }

    try {
      email = Email.create(data.email);
    } catch (error: unknown) {
      errors.push(error instanceof Error ? error.message : 'Invalid email');
    }

    try {
      password = Password.create(data.password);
    } catch (error: unknown) {
      errors.push(error instanceof Error ? error.message : 'Invalid password');
    }

    if (errors.length > 0) {
      this.setState({ errors, isLoading: false });
      return false;
    }

    try {
      const user = User.create({
        name: data.name.trim(),
        email: email!,
        password: password!,
      });
      await this.addUser.execute(user);
      await this.loadUsers();
      this.setState({ successMessage: 'User created successfully', isLoading: false });
      return true;
    } catch (error: unknown) {
      this.setState({
        errors: [error instanceof Error ? error.message : 'Failed to create user'],
        isLoading: false,
      });
      return false;
    }
  }

  clearMessages(): void {
    this.setState({ errors: [], successMessage: null });
  }
}
