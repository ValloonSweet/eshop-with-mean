import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export async function restrictUser(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return res.status(401).send({
                status: false,
                msg: 'Auth token is not provided'
            })
        }

        const jwtToken = authHeader.split(' ')[1];
        if(!jwtToken) {
            return res.status(401).send({
                status: false,
                msg: 'Auth token is not provided'
            })
        }

        const decoded = jwt.verify(jwtToken, process.env.JWT_PRIVATE_KEY || '');
        req.body.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({
            status: false,
            msg: 'Auth token is incorrect'
        })
    }
}
