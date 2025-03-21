import { Router } from "express";
import { AdminController } from "../controllers/implementation/admin.controller";
import { AdminService } from "../services/implementation/admin.service";
import AdminRepository from '../repositories/implementation/admin.repository';

const adminService = new AdminService(AdminRepository)
const adminController = new AdminController(adminService)
const router = Router()

router
    .get('/subscription-plans', adminController.getAllPlans.bind(adminController))
    .post('/subscription-plans/add-plan', adminController.createPlan.bind(adminController))

export default router