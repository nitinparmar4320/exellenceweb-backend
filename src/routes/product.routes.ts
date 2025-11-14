import { Router } from "express";
import { verifyUserToken } from "../middleware/jwt";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/product.controller";

const productRouter = Router()

productRouter.post("/add", verifyUserToken, createProduct)
productRouter.get("/", verifyUserToken, getAllProducts)
productRouter.put("/update/:productId", verifyUserToken, updateProduct)
productRouter.delete("/delete/:productId", verifyUserToken, deleteProduct)

export default productRouter;