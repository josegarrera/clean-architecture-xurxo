import { DeclarativePresenter, PresenterState, UserDTO, UserFormData } from './ports/declarativePresenterInterface';

export class HttpDeclarativePresenter implements DeclarativePresenter {
  private state: PresenterState = {
    users: [],
    errors: [],
    isLoading: false,
    successMessage: null,
  };

  private subscribers: Set<(state: PresenterState) => void> = new Set();

  constructor(private apiUrl: string = 'http://localhost:3001') {}

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
      const response = await fetch(`${this.apiUrl}/api/users`);
      if (!response.ok) throw new Error('Failed to load users');
      const users: UserDTO[] = await response.json();
      this.setState({ users, isLoading: false });
    } catch {
      this.setState({ errors: ['Failed to load users'], isLoading: false });
    }
  }

  async createUser(data: UserFormData): Promise<boolean> {
    this.setState({ isLoading: true, errors: [], successMessage: null });

    try {
      const response = await fetch(`${this.apiUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        this.setState({ errors: [error.error || 'Failed to create user'], isLoading: false });
        return false;
      }

      await this.loadUsers();
      this.setState({ successMessage: 'User created successfully', isLoading: false });
      return true;
    } catch {
      this.setState({ errors: ['Failed to create user'], isLoading: false });
      return false;
    }
  }

  clearMessages(): void {
    this.setState({ errors: [], successMessage: null });
  }
}
