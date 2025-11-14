import { Request, Response } from "express";
import Product from "../models/product.model";
import { HttpResponse, StatusCodes } from "../utils/httpResponse";
import { products } from "../utils/productSeeder";

export const seedProducts = async () => {
    const count = await Product.countDocuments();

    if (count > 0) {
        console.log("Products already exist!");
        return;
    }

    await Product.insertMany(products);
    console.log("Default Products successfully!");
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await new Product(req.body).save()
        return HttpResponse.created(res, {
            status: StatusCodes.CREATED,
            message: "Product created!",
            data: product,
        });
    } catch (e: any) {
        return HttpResponse.serverError(res, e)
    }
};

export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await Product.find();
        return HttpResponse.success(res, {
            status: StatusCodes.OK,
            message: "Product created!",
            data: products,
        });
    } catch (e: any) {
        return HttpResponse.serverError(res, e)
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        console.log(req.params, "req.params")
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        if (!product) {
            return HttpResponse.notFound(res, {
                status: StatusCodes.NOT_FOUND,
                message: "Product not found",
            });
        }
        return HttpResponse.created(res, {
            status: StatusCodes.CREATED,
            message: "Product uodated!",
            data: product,
        });
    } catch (e: any) {
        return HttpResponse.serverError(res, e)
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        console.log("first")
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) {
            return HttpResponse.notFound(res, {
                status: StatusCodes.NOT_FOUND,
                message: "Product not found",
            });
        }
        return HttpResponse.created(res, {
            status: StatusCodes.CREATED,
            message: "Product deleted!",
            data: product,
        });
    } catch (e: any) {
        return HttpResponse.serverError(res, e)
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { selectedCategory, price, priceSorting } = req.body

        const query = {} as any

        if (selectedCategory) {
            query.category = selectedCategory
        }
        if (price) {
            query.price = { $lte: price };
        }
        const products = await Product.find(query).sort({ [priceSorting ? "price" : "title"]: priceSorting || 1 });

        return HttpResponse.success(res, {
            status: StatusCodes.OK,
            message: "Products list",
            data: products,
        });
    } catch (e: any) {
        return HttpResponse.serverError(res, e)
    }
}
