/*
El usuario es una entidad por lo que debe comparar por id
Debe tener nombre, email, password todos obligatorios

Test Plan:
1. Crear usuario con datos validos
2. No crear usuario sin nombre
3. No crear usuario sin email
4. No crear usuario sin password
5. Comparar dos usuarios con mismo id son iguales
6. Comparar dos usuarios con distinto id son distintos
 */

import { User } from '../domain/User';
import { Email } from '../domain/Email';
import { Password } from '../domain/Password';

describe('User', () => {
  it('should create a user with valid data', () => {
    const email = Email.create('test@example.com');
    const password = Password.create('password123');

    const user = User.create({
      name: 'John Doe',
      email,
      password,
    });

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe('John Doe');
  });

  it('should not create user without name', () => {
    const email = Email.create('test@example.com');
    const password = Password.create('password123');

    expect(() => {
      User.create({
        name: '',
        email,
        password,
      });
    }).toThrow('Name is required');
  });

  it('should not create user without email', () => {
    const password = Password.create('password123');

    expect(() => {
      User.create({
        name: 'John Doe',
        email: undefined as unknown as Email,
        password,
      });
    }).toThrow('Email is required');
  });

  it('should not create user without password', () => {
    const email = Email.create('test@example.com');

    expect(() => {
      User.create({
        name: 'John Doe',
        email,
        password: undefined as unknown as Password,
      });
    }).toThrow('Password is required');
  });

  it('should be equal with same id', () => {
    const email1 = Email.create('test1@example.com');
    const password1 = Password.create('password123');
    const user1 = User.create({
      name: 'John Doe',
      email: email1,
      password: password1,
    });

    const email2 = Email.create('test2@example.com');
    const password2 = Password.create('password456');
    const user2 = User.create({
      name: 'Jane Doe',
      email: email2,
      password: password2,
    });

    // Manually set same id for testing
    Object.defineProperty(user2, 'id', { value: user1.id });

    expect(user1.equals(user2)).toBe(true);
  });

  it('should not be equal with different id', () => {
    const email = Email.create('test@example.com');
    const password = Password.create('password123');
    const user1 = User.create({
      name: 'John Doe',
      email,
      password,
    });

    const user2 = User.create({
      name: 'John Doe',
      email,
      password,
    });

    expect(user1.equals(user2)).toBe(false);
  });
});
