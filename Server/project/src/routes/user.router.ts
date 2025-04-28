import { Router } from "express";
import { UserController } from '../controllers/implementation/user.controller';
import { UserService } from '../services/implementation/user.service';
import UserRepository from "../repositories/implementation/user.repository";

const userService = new UserService(UserRepository)
const userController = new UserController(userService)

const router = Router()

router.post('/projects/add-project', userController.addProject.bind(userController))

export default router