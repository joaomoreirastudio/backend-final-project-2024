import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, updateUserById } from '../middleware/authService.js';
import User from '../models/userModel.js';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role } = req.body;
      const { user, token } = await registerUser(name, email, password, role);
      res.status(201).json({ user, token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { user, token } = await loginUser(email, password);
      res.status(200).json({ user, token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, role } = req.body;
      const updatedUser = await updateUserById(id, { name, email, role });
      res.status(200).json(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }
}

export default new AuthController();
export const register = new AuthController().register;
export const login = new AuthController().login;
export const getUsers = new AuthController().getUsers;
export const updateUser = new AuthController().updateUser;
export const deleteUser = new AuthController().deleteUser;
