export class Email {
  private constructor(readonly value: string) {
    this.value = value;
  }

  static create(email: string): Email {
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Invalid email address');
    return new Email(email);
  }

  equals(other: Email) {
    return this.value === other.value;
  }

  hasSameDomain(secondEmail: Email) {
    return this.value.split('@')[1] === secondEmail.value.split('@')[1];
  }
}
