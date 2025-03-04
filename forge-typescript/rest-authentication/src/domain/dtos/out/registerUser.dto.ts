import { emailValidator } from "../../../utils/emailValidator.utils";

export class RegisterUserDTO {
  private readonly name: string;
  private readonly email: string;
  private readonly password: string;

  private constructor(data: {
    name: string;
    email: string;
    password: string;
  }) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }

  static create(data: {
    name: string;
    email: string;
    password: string;
  }): [string?, RegisterUserDTO?] {
    const { name, email, password } = data;
    if (!name || !email || !password) {
      return ["Missing required fields", undefined];
    }
    if (!emailValidator(email)) {
      return ["Invalid email", undefined];
    }
    return [undefined, new RegisterUserDTO(data)];
  }
}
