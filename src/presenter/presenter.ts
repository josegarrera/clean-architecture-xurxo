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
    this.view.showCreateUserPrompt();

    const name = await this.view.askForName();
    const email = await this.view.askForEmail();
    const password = await this.view.askForPassword();

    // hacer linea a linea para devolver errores
    const user = User.create({ name, email: Email.create(email), password: Password.create(password) });

    this.addUser.execute(user);

    this.view.showUserCreated();
  }
}
