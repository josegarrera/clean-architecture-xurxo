import { expect, test } from '@jest/globals';
import { sum } from '../core/sum';

test('should sum two numbers', () => {
  const result = sum(1, 2);
  const expected = 3;

  expect(result).toBe(expected);
});

describe('Password', () => {
  it('should create a password', () => {
    const password = Password.create('12345678');
    expect(password.valueOf()).toBe('12345678');
  });

  it('should validate at least 8 characters', () => {
    expect(() => Password.create('123')).toThrow('Password must be at least 8 characters long');
  });
});

/*
Entidades
- usuario

Value Objects
- Password
- Email
 */

class Password {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  valueOf(): string {
    return this.value;
  }

  static create(password: string): Password {
    if (password.length < 8) throw new Error('Password must be at least 8 characters long');
    return new Password(password);
  }
}
