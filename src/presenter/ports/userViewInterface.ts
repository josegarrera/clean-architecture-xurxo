import { User } from '../../domain/User';

export interface UserView {
  showWelcome(): void;
  showUsers(users: User[]): void;
  showCreateUserPrompt(): void;
  askForName(): Promise<string>;
  askForEmail(): Promise<string>;
  askForPassword(): Promise<string>;
  showUserCreated(): void;
  showErrors(errors: string[]): void;
  // showError(message: string): void;
  // createUserInput(props: UserProps): UserProps;
}
