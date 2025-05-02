import { Router } from "express";
import { UserController } from '../controllers/implementation/user.controller';
import { UserService } from '../services/implementation/user.service';
import UserRepository from "../repositories/implementation/user.repository";
import { upload } from "../config";

const userService = new UserService(UserRepository)
const userController = new UserController(userService)

const router = Router()

router.post('/projects/add-project',upload.single('projectsImage'), userController.addProject.bind(userController))

export default router