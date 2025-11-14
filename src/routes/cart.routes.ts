import { Router } from "express";
import { verifyUserToken } from "../middleware/jwt";
import { addToCart, getCart, removeFromCart, updateCartItem } from "../controllers/cart.controller";

const cartRouter = Router()

cartRouter.post("/add", verifyUserToken, addToCart)
cartRouter.put("/update/:productId", verifyUserToken, updateCartItem)
cartRouter.delete("/remove/:productId", verifyUserToken, removeFromCart)
cartRouter.get("/", verifyUserToken, getCart)
export default cartRouter;