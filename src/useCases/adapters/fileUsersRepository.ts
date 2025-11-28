import * as fs from 'fs';
import * as path from 'path';
import { IUsersRepository } from '../ports/IUsersRepository';
import { User } from '../../domain/User';
import { Email } from '../../domain/Email';
import { Password } from '../../domain/Password';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class FileUsersRepository implements IUsersRepository {
  private readonly filePath: string;

  constructor(filePath?: string) {
    this.filePath = filePath ?? path.join(process.cwd(), 'data', 'users.json');
    this.ensureFileExists();
  }

  private ensureFileExists(): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '[]', 'utf-8');
    }
  }

  private readFile(): StoredUser[] {
    const content = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(content) as StoredUser[];
  }

  private writeFile(users: StoredUser[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2), 'utf-8');
  }

  private toStoredUser(user: User): StoredUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      password: user.password.value,
    };
  }

  private toDomainUser(stored: StoredUser): User {
    const email = Email.create(stored.email);
    const password = Password.create(stored.password);
    const user = User.create({ name: stored.name, email, password });
    // Override the generated id with the stored one
    Object.defineProperty(user, 'id', { value: stored.id, writable: false });
    return user;
  }

  async getAll(): Promise<User[]> {
    const storedUsers = this.readFile();
    return storedUsers.map((stored) => this.toDomainUser(stored));
  }

  async add(user: User): Promise<void> {
    const storedUsers = this.readFile();
    storedUsers.push(this.toStoredUser(user));
    this.writeFile(storedUsers);
  }
}
