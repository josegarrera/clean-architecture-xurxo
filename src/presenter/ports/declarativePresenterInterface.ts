export interface UserDTO {
  id: string;
  name: string;
  email: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
}

export interface PresenterState {
  users: UserDTO[];
  errors: string[];
  isLoading: boolean;
  successMessage: string | null;
}

export interface DeclarativePresenter {
  getState(): PresenterState;
  loadUsers(): Promise<void>;
  createUser(data: UserFormData): Promise<boolean>;
  clearMessages(): void;
  subscribe(callback: (state: PresenterState) => void): () => void;
}
