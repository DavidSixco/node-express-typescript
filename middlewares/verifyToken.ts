import jwt from 'jsonwebtoken';
import { ITokenRequest } from './../types/config/typeConfig';
import { Request, Response, NextFunction } from 'express';

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];
        console.log(token, 'tokenenenenenennenenenx`enenenen');
        if (!token) {
            return res.status(401).json({
                ok: false,
                msj: 'No token provider'
            });
        };

        const payload = jwt.verify(token, `${process.env.SECRET_JWT_SEE}`) as ITokenRequest;
        req.Itoken.uid = payload.uid;
        req.Itoken.uid = payload.name;
        next();
    } catch (error) {
        console.error('Unexpedted error in', error);
        return res.status(401).json({
            ok: false,
            msj: error.message
        });
    }
};
