export class User {
  private readonly id: string;
  private readonly name: string;
  private readonly email: string;
  private readonly password: string;
  private readonly role: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(
    data: {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
    }
  ) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}