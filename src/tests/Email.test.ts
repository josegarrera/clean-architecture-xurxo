import { Email } from '../domain/Email';

describe('Email', () => {
  it('should throw an error if email is invalid', () => {
    expect(() => Email.create('invalid-email')).toThrow('Invalid email address');
  });

  it('should create an email', () => {
    const email = Email.create('hola@dominio.com');
    expect(email.value).toBe('hola@dominio.com');
  });

  it('should be equal with the same address', () => {
    const firstEmail = Email.create('email@dominio.com');
    const secondEmail = Email.create('email@dominio.com');
    expect(firstEmail.equals(secondEmail)).toBe(true);
  });

  it('should be not equal with different addresses', () => {
    const firstEmail = Email.create('first-email@dominio.com');
    const secondEmail = Email.create('second-email@dominio.com');
    expect(firstEmail.equals(secondEmail)).toBe(false);
  });
});
