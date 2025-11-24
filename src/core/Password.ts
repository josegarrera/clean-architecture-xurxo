export class Password {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  valueOf(): string {
    return this.value;
  }

  static create(password: string): Password {
    if (password.length < 8) throw new Error('Password must be at least 8 characters long');
    if (!/[a-zA-Z]/.test(password)) throw new Error('Password must have at least 1 letter');
    if (!/\d/.test(password)) throw new Error('Password must have at least 1 number');
    return new Password(password);
  }

  equals(other: Password) {
    return this.value === other.valueOf();
  }
}
