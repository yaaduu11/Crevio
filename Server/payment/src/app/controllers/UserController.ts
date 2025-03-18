import { NextFunction, Request, Response } from "express";
import { IUserController } from "../../interfaces/user/IUserController";
import { IUserService } from "../../interfaces/user/IUserService";

export class UserController implements IUserController {
    constructor(private userService: IUserService) {}


}