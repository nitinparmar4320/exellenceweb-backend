import { Response } from "express";

export const StatusCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export class HttpResponse {
    static success(res: Response, data: object) {
        res.status(StatusCodes.OK).json(data);
    }

    static created(res: Response, data: object) {
        res.status(StatusCodes.CREATED).json(data);
    }

    static badReuest(res: Response, data: object) {
        res.status(StatusCodes.BAD_REQUEST).json(data);
    }

    static unAuthorized(res: Response, data: object) {
        res.status(StatusCodes.UNAUTHORIZED).json(data);
    }

    static notFound(res: Response, data: object) {
        res.status(StatusCodes.NOT_FOUND).json(data);
    }

    static serverError(res: Response, error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "INTERNAL SERVER ERROR",
            data: error.message,
        });
    }
}