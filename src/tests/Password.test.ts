import { expect } from '@jest/globals';
import { Password } from '../core/Password';

describe('Password', () => {
  it('should create a password', () => {
    const password = Password.create('12345678A');
    expect(password.valueOf()).toBe('12345678A');
  });

  it('should validate at least 8 characters', () => {
    expect(() => Password.create('123')).toThrow('Password must be at least 8 characters long');
  });

  it('should validate at least 1 letter', () => {
    expect(() => Password.create('12345678')).toThrow('Password must have at least 1 letter');
  });

  it('should validate at least 1 number', () => {
    expect(() => Password.create('AAAAAAAA')).toThrow('Password must have at least 1 number');
  });
});

/*
Entidades
- usuario

Value Objects
- Password
- Email
 */
