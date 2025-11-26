// app de consola que invoque los casos de uso

import { User } from '../domain/User';
import { ListUsers } from '../useCases/listUsers';

export interface UserView {
  showWelcome(): void;
  showUsers(users: User[]): void;
  // showCreateUserPrompt(): void;
  // showError(message: string): void;
  // createUserInput(props: UserProps): UserProps;
}

export class Presenter {
  constructor(
    private view: UserView,
    private listUsers: ListUsers
  ) {}

  presentWelcome(): void {
    this.view.showWelcome();
  }

  async presentUsers(): Promise<void> {
    const users = await this.listUsers.execute();
    this.view.showUsers(users);
  }
}
