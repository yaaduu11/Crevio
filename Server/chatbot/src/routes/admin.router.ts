import Router  from "express";
import { AdminController } from "../controller/implementation/admin.controller";
import { AdminService } from "../services/implementation/admin.service";
import AdminRepository from "../repositories/implementation/admin.repository";

const adminService = new AdminService(AdminRepository)
const adminController = new AdminController(adminService)

const router = Router()

export default router