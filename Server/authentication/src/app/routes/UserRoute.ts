import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { UserService } from '../../services/UserService'
import UserRepository from '../../repositories/UserRepository'
import { upload } from '../../config/multer'
import { signinValidation, signupValidation } from '../../utils/validation'
import { formValidator } from '../middlewares/formValidator'

const userService = new UserService(UserRepository)
const userController = new UserController(userService)
const router = Router()

router
    .post('/register', formValidator(signupValidation), userController.register.bind(userController))
    .post('/login', formValidator(signinValidation), userController.login.bind(userController))
    .post('/verifyOtp', userController.verifyOtp.bind(userController))
    .post('/resendOtp', userController.resendOtp.bind(userController))
    .patch('/assign-role', userController.assignRole.bind(userController))
    .post('/google-auth', userController.googleAuth.bind(userController))
    .post('/forgot-password', userController.forgotPassword.bind(userController))
    .post('/verifyOtpFP', userController.verifyOtpFP.bind(userController))
    .patch('/new-password', userController.newPassword.bind(userController))
    .post('/refreshToken', userController.refreshToken.bind(userController))
    .post('/update-profile', upload.single('profileImage'), userController.updateProfile.bind(userController))
    .get('/profile-image', userController.getProfileImage.bind(userController))
    .patch('/edit-user-name', userController.editUserName.bind(userController))
    .delete('/logout', userController.logout.bind(userController));

export default router