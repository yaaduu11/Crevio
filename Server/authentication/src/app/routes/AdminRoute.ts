import {Router} from 'express';
import { AdminController } from '../controllers/AdminController';
import { AdminService } from '../../services/AdminService';
import AdminRepository from '../../repositories/AdminRepository';

const adminService = new AdminService(AdminRepository)
const adminController = new AdminController(adminService)

const router = Router()

router.post(
    '/login',
    adminController.signin.bind(adminController)
)

router.get(
    '/get-freelancers',
    adminController.getFreelancers.bind(adminController)
)

router.get(
    '/get-clients',
    adminController.getClients.bind(adminController)
)

router.delete(
    '/logout',
    adminController.logout.bind(adminController)
)

export default router