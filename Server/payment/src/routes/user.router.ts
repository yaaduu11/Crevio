import express, { Router } from "express";
import { UserController } from "../controllers/implementation/user.controller";
import { UserService } from "../services/implementation/user.service";
import UserRepository from '../repositories/implementation/user.repository';

const userService = new UserService(UserRepository)
const userController = new UserController(userService)
const router = Router()

router
    .post('/pricing/checkout', userController.createCheckoutSession.bind(userController))
    .post("/pricing/webhook", express.raw({ type: "application/json" }), userController.handleWebhook.bind(userController))

export default router