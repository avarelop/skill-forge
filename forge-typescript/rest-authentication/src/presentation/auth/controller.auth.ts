import { Request, Response } from "express";
import { RegisterUserDTO } from "../../domain/index.domain";

export class AuthController {
  
  constructor(){}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDTO] = RegisterUserDTO.create(req.body);
    if (error) {
      res.status(400).json({ message: error });
    }
    res.status(201).json({ message: "User registered successfully", registerUserDTO });
  }

  login = (req: Request, res: Response) => {
    res.status(200).json({ message: "User logged in successfully" });
  }
}
