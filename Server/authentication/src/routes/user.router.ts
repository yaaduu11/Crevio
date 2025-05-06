import { Router } from 'express'
import { UserController } from '../controllers/implementation/user.controller'
import { UserService } from '../services/implementation/user.service'
import UserRepository from '../repositories/implementation/user.repository'
import { upload } from '../config'
import { formValidator } from '../middlewares'
import { signinValidation, signupValidation } from '../utils'

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
    .post('/add-more-info', userController.addMoreInfo.bind(userController))
    .patch('/update-more-info', userController.updateMoreInfo.bind(userController))
    .get('/more-info', userController.getMoreInfo.bind(userController))
    .get('/fetch-user', userController.getUserData.bind(userController))

    .get('/fetch-user-by-id/:id', userController.getUserDataById.bind(userController))
    .patch('/update-user-sub-status', userController.updateUserSubStatus.bind(userController))
    .delete('/logout', userController.logout.bind(userController));

export default router
