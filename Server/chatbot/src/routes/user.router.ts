import Router  from "express";
import { UserController } from "../controller/implementation/user.controller";
import { UserService } from "../services/implementation/user.service";
import UserRepository from "../repositories/implementation/user.repository";

const userService = new UserService(UserRepository)
const userController = new UserController(userService)

const router = Router()

router.post('/message', userController.handleUserMessage.bind(userController));

export default router