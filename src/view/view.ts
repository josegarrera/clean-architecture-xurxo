import { User } from '../domain/User';
import * as readline from 'readline';
import { UserView } from '../presenter/ports/userViewInterface';

export class View implements UserView {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  showUsers(users: User[]): void {
    if (users.length === 0) {
      console.log('Users is empty!');
      return;
    }

    console.log('Users!:');
    users.forEach((user) => {
      console.log(`\n${user.name} - ${user.email.value}`);
    });
  }

  showWelcome(): void {
    console.log('Welcome to the User Management System');
  }

  showCreateUserPrompt(): void {
    console.log('Create a new user:');
  }

  async askForName(): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question('Name? ', (name) => {
        resolve(name.trim());
      });
    });
  }

  async askForEmail(): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question('Email? ', (email) => {
        resolve(email.trim());
      });
    });
  }

  async askForPassword(): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question('Password? ', (password) => {
        resolve(password.trim());
      });
    });
  }

  showUserCreated(): void {
    console.log('Creating new User');
  }

  close(): void {
    this.rl.close();
  }
}
