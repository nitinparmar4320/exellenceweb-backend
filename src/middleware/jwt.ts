import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpResponse, StatusCodes } from '../utils/httpResponse';
import { evnVar } from '../helpers/envConfig';

export const verifyUserToken = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    const token = (req.headers.token as string) || undefined;
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const verified =
            jwt.verify(
                token,
                evnVar.JWT_SECRET_KEY as jwt.Secret
            );
        if (!verified) {
            return HttpResponse.unAuthorized(res, {
                status: StatusCodes.UNAUTHORIZED,
                message: "INVALID TOKEN",
            });
        }
        req.user = verified;
        next();
    } catch (error: any) {
        return HttpResponse.serverError(res, error)
    }
};
