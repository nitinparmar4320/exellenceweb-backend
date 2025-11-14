import { Request, Response } from "express";
import Cart from "../models/cart.model";
import { getUserId } from "../utils/common";
import { HttpResponse, StatusCodes } from "../utils/httpResponse";

export const addToCart = async (req: Request, res: Response) => {
    try {
        const userId = await getUserId(req);
        const { productId, quantity = 1 } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = await Cart.create({ userId, items: [{ productId, quantity }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }

            await cart.save();
        }

        return HttpResponse.created(res, {
            status: StatusCodes.OK,
            message: "Success",
            data: cart,
        });
    } catch (error: any) {
        return HttpResponse.serverError(res, error)
    }
};

export const updateCartItem = async (req: Request, res: Response) => {
    try {
        const userId = await getUserId(req);
        const { productId } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return HttpResponse.notFound(res, {
                status: StatusCodes.NOT_FOUND,
                message: "not found",
            });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);
        if (!item) {
            return HttpResponse.notFound(res, {
                status: StatusCodes.NOT_FOUND,
                message: "not found",
            });
        }
        item.quantity = quantity;
        await cart.save();

        return HttpResponse.success(res, {
            status: StatusCodes.OK,
            message: "Success",
            data: cart,
        });
    } catch (error: any) {
        return HttpResponse.serverError(res, error)
    }
};

export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const userId = await getUserId(req);
        const { productId } = req.params;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return HttpResponse.notFound(res, {
                status: StatusCodes.NOT_FOUND,
                message: "not found",
            });
        }

        if (productId === "0") {
            cart.items = [];
        } else {
            cart.items = cart.items.filter(
                item => item.productId.toString() !== productId
            );
        }

        // cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        return HttpResponse.success(res, {
            status: StatusCodes.OK,
            message: "Success",
            data: cart,
        });
    } catch (error: any) {
        return HttpResponse.serverError(res, error)
    }
};

export const getCart = async (req: Request, res: Response) => {
    try {
        const userId = await getUserId(req);
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart) {
            return HttpResponse.notFound(res, {
                status: StatusCodes.NOT_FOUND,
                message: "not found",
            });
        }
        return HttpResponse.success(res, {
            status: StatusCodes.OK,
            message: "Success",
            data: cart,
        });
    } catch (error: any) {
        console.log(error, "error")
        return HttpResponse.serverError(res, error)
    }
};

