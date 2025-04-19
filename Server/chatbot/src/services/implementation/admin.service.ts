import { IAdminRepository } from "../../repositories/interface/admin-repository.interface";
import { IAdminService } from "../interface/admin-service.interface";


export class AdminService implements IAdminService {
    constructor(private adminRepository : IAdminRepository) {}
}