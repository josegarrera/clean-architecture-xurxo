import { Email } from './Email';
import { Password } from './Password';
import { randomUUID } from 'crypto';

export interface UserProps {
  name: string;
  email: Email;
  password: Password;
}

export class User {
  readonly id: string;
  readonly name: string;
  readonly email: Email;
  readonly password: Password;

  private constructor(props: UserProps) {
    this.id = randomUUID();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  static create(props: UserProps): User {
    if (!props.name || props.name.trim() === '') {
      throw new Error('Name is required');
    }
    if (!props.email) {
      throw new Error('Email is required');
    }
    if (!props.password) {
      throw new Error('Password is required');
    }
    return new User(props);
  }

  equals(other: User): boolean {
    return this.id === other.id;
  }
}
