import { Email } from '../domain/Email';
import { Password } from '../domain/Password';
import { User } from '../domain/User';
import { AddUser } from '../useCases/addUser';
import { ListUsers } from '../useCases/listUsers';
import { UserView } from './ports/userViewInterface';

export class Presenter {
  constructor(
    private view: UserView,
    private listUsers: ListUsers,
    private addUser: AddUser
  ) {}

  async init(): Promise<void> {
    const showList = true;
    this.presentWelcome();
    while (showList) {
      await this.presentUsers();
      await this.presentCreateUserPrompt();
    }
  }

  presentWelcome(): void {
    this.view.showWelcome();
  }

  async presentUsers(): Promise<void> {
    const users = await this.listUsers.execute();
    this.view.showUsers(users);
  }

  async presentCreateUserPrompt(): Promise<void> {
    const errors: string[] = ['Ups, something went wrong :( \n'];
    this.view.showCreateUserPrompt();

    const name = await this.view.askForName();
    let email: Email | null = null;
    let password: Password | null = null;

    try {
      email = Email.create(await this.view.askForEmail());
    } catch (error: unknown) {
      errors.push(error instanceof Error ? error.message : 'Error de email desconocido');
    }

    try {
      password = Password.create(await this.view.askForPassword());
    } catch (error: unknown) {
      errors.push(error instanceof Error ? error.message : 'Error de contraseña desconocido');
    }

    if (email && password) {
      const user = User.create({ name, email, password });

      this.addUser.execute(user);
    }

    // TODO Show errors properly
    if (errors.length > 1) {
      this.view.showErrors(errors);
      return;
    }
    this.view.showUserCreated();
  }
}
