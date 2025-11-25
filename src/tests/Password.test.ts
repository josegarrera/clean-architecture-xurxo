import { expect } from '@jest/globals';
import { Password } from '../domain/Password';

describe('Password', () => {
  it('should create a password', () => {
    const password = Password.create('12345678A');
    expect(password.value).toBe('12345678A');
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

  it('should be equal with the same pasword', () => {
    const firstPassword = Password.create('password123');
    const secondPassword = Password.create('password123');
    expect(firstPassword.equals(secondPassword)).toBe(true);
  });

  it('should be not equal with different passwords', () => {
    const firstPassword = Password.create('password123');
    const secondPassword = Password.create('password456');
    expect(firstPassword.equals(secondPassword)).toBe(false);
  });
});

/*
Entidades
- usuario

Value Objects
- Email
 */
