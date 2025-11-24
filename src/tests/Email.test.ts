import { Email } from '../core/Email';

describe('Email', () => {
  it('should throw an error if email is invalid', () => {
    expect(() => Email.create('invalid-email')).toThrow('Invalid email address');
  });
});
