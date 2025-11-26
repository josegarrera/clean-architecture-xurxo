import { User } from '../domain/User';
import { UserView } from '../presenter/presenter';

export class View implements UserView {
  showUsers(users: User[]): void {
    if (users.length === 0) {
      console.log('Users is empty!');
      return;
    }

    console.log('Users!:');
    users.forEach((user) => {
      console.log(`\n${user.name} - ${user.email}`);
    });
  }
  showWelcome(): void {
    console.log('Welcome to the User Management System');
  }
}
