import { Request, Response } from "express";
import User from "../models/user.model";
import { HttpResponse, StatusCodes } from "../utils/httpResponse";
import { encyptPassword } from "../utils/common";
import bcypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { evnVar } from "../helpers/envConfig";

export const Register = async (req: Request, res: Response) => {
    try {
        const { email, password, fullName } = req.body

        const checkEmail = await User.findOne({ email });

        if (checkEmail) {
            return HttpResponse.badReuest(res, {
                status: StatusCodes.BAD_REQUEST,
                message: "Email already exist",
            });
        }

        const passwordHash = await encyptPassword(password);
        new User({ email, password: passwordHash, fullName }).save()

        return HttpResponse.created(res, {
            status: StatusCodes.CREATED,
            message: "User created!",
        });

    } catch (e: any) {
        return HttpResponse.serverError(res, e)
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const checkUser = await User.findOne({ email }) as User;

        if (!checkUser) {
            return HttpResponse.notFound(res, {
                status: StatusCodes.NOT_FOUND,
                message: "Invalid creditials",
            });
        }

        if (!bcypt.compareSync(password, checkUser?.password)) {
            return HttpResponse.badReuest(res, {
                status: StatusCodes.BAD_REQUEST,
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            { _id: checkUser._id },
            evnVar.JWT_SECRET_KEY as jwt.Secret
        );

        return HttpResponse.success(res, {
            status: StatusCodes.OK,
            message: "User Log in successfully",
            data: token,
        });

    } catch (e: any) {
        return HttpResponse.serverError(res, e)
    }
}