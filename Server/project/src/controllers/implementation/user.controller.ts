import { IUserService } from "../../services/interface/user-service.interface";
import { IUserController } from "../interface/user-controller.interface";

class UserController implements IUserController {
    constructor(private userService: IUserService) {}

    
}