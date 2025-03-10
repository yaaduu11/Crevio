import { IAdminController } from "../../interfaces/admin/IAdminController";
import { IAdminService } from "../../interfaces/admin/IAdminService";

export class AdminController implements IAdminController {
    constructor(private userService: IAdminService) {}
}