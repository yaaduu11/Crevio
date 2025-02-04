import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { UserService } from '../../services/UserService'
import UserRepository from '../../repositories/UserRepository'

const userService = new UserService(UserRepository)
const userController = new UserController(userService)
const router = Router()

router.post(
    '/register',
    userController.register.bind(userController) 
)

router.post(
    '/verifyOtp',
    userController.verifyOtp.bind(userController)
)

router.post(
    '/login',
    userController.login.bind(userController)
)

export default router