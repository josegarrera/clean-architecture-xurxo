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

import { User } from '../core/User';
import { Email } from '../core/Email';
import { Password } from '../core/Password';

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
});
