import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    uid: string;
    nombre: string;
}

// extiende el objeto Request de Express para agregar uid y nombre
declare global {
    namespace Express {
        interface Request {
            uid?: string;
            nombre?: string;
        }
    }
}

export const validarJwt = (req: Request, res: Response, next: NextFunction): any => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No hay token en la petición'
        });
    }
    const secret = process.env.SECRET_JWT_SEED;
    if (!secret) {
        throw new Error('SECRET_JWT_SEED is not defined');
    }

    try {

        const payload = jwt.verify(token, secret) as JwtPayload;
        const { uid, nombre } = payload;

        req.uid = uid;
        req.nombre = nombre;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token no valido'
        });
    }
    next();
}