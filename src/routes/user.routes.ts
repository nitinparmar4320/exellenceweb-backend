import { Router } from "express";
import { Login, Register } from "../controllers/user.controller";

const userRoutes = Router()
userRoutes.post("/sign-up", Register)
userRoutes.post("/login", Login)

export default userRoutes;