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
    '/resendOtp',
    userController.resendOtp.bind(userController)
)

router.patch(
    '/assign-role',
    userController.assignRole.bind(userController)
)

router.get(
    '/check-role',
    userController.checkRole.bind(userController)
)

router.post(
    '/login',
    userController.login.bind(userController)
)

router.post(
    '/google-auth',
    userController.googleAuth.bind(userController)
)

router.post(
    '/forgot-password',
    userController.forgotPassword.bind(userController)
)

router.post(
    '/verifyOtpFP',
    userController.verifyOtpFP.bind(userController)
)

router.patch(
    '/new-password',
    userController.newPassword.bind(userController)
)

router.delete(
    '/logout',
    userController.logout.bind(userController)
)

export default router