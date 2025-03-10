import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { UserService } from '../../services/UserService'
import UserRepository from '../../repositories/UserRepository'
import { upload } from '../../config/multer'

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

router.post(
    '/refreshToken',
    userController.refreshToken.bind(userController)
)

router.post(
    '/update-profile',
    upload.single("profileImage"),
    userController.updateProfile.bind(userController)
)

router.get(
    '/get-profile-image',
    userController.getProfileImage.bind(userController)
)

router.patch(
    '/edit-user-name',
    userController.editUserName.bind(userController)
)

router.delete(
    '/logout',
    userController.logout.bind(userController)
)

export default router