export class Email {
  private constructor(private readonly value: string) {
    this.value = value;
  }

  valueOf(): string {
    return this.value;
  }

  static create(email: string): Email {
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Invalid email address');
    return new Email(email);
  }
}
