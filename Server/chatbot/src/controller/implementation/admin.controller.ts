import { IAdminService } from "../../services/interface/admin-service.interface";
import { IAdminController } from "../interface/admin-controller.interface";

export class AdminController implements IAdminController {
    constructor(private adminService : IAdminService) {}
}