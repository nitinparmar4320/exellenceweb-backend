import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { evnVar } from '../helpers/envConfig';
import { Request } from 'express';

export const encyptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = bcrypt.hash(password, salt);
    return passwordHash;
};

export const getUserId = async (req: Request): Promise<string> => {
    const token = req.headers.token as string;

    const verified: any =
        jwt.verify(
            token,
            evnVar.JWT_SECRET_KEY as jwt.Secret
        );
    const userId = verified._id;
    return userId;
};

