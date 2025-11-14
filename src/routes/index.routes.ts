import { Router } from "express";
import userRoutes from "./user.routes";
import cartRouter from "./cart.routes";
import productRouter from "./product.routes";

const router = Router()

router.use("/user", userRoutes)
router.use("/product", productRouter)
router.use("/cart", cartRouter)

export default router;