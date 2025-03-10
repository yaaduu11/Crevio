import { IAdminRepository } from "../interfaces/admin/IAdminRepository";
import { IAdminService } from "../interfaces/admin/IAdminService"

export class AdminService implements IAdminService {
    constructor(private adminRepository: IAdminRepository) {}

    
}