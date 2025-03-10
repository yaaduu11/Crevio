import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { AdminService } from "../../services/AdminService";
import AdminRepository from "../../repositories/AdminRepository";

const adminService = new AdminService(AdminRepository)
const adminController = new AdminController(adminService)
const router = Router()

export default router