import {Router} from 'express';
import { AdminController } from '../controllers/implementation/admin.controller';
import { AdminService } from '../services/implementation/admin.service';
import AdminRepository from '../repositories/implementation/admin.repository';

const adminService = new AdminService(AdminRepository)
const adminController = new AdminController(adminService)

const router = Router()

router
    .post('/login', adminController.signin.bind(adminController))
    .get('/freelancers', adminController.getFreelancers.bind(adminController))
    .get('/more-info', adminController.getMoreInfo.bind(adminController))
    .get('/clients', adminController.getClients.bind(adminController))
    .patch('/clients/toggle-status', adminController.clientBlockUnblock.bind(adminController))
    .patch('/freelancers/toggle-status', adminController.freelancerBlockUnblock.bind(adminController))
    .delete('/logout', adminController.logout.bind(adminController));

export default router