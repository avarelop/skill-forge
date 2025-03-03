import { Request, Response } from "express";

export class AuthController {
  
  constructor(){}

  registerUser = (req: Request, res: Response) => {
    res.status(201).json({ message: "User registered successfully" });
  }

  login = (req: Request, res: Response) => {
    res.status(200).json({ message: "User logged in successfully" });
  }
}
