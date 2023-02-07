import { Request, Response } from "express";
import { getUserByEmail } from "../services/user.service";
import { IUserDocument } from "../models/users.model";

export const loginHandler = async (req: Request, res: Response) => {
    const user = await getUserByEmail(req.body.email) as IUserDocument;
    if(!user) {
        return res.status(404).send({
            status: false,
            msg: 'Not found user'
        })
    }

    const passwordCheck = await user.comparePassword(req.body.password);
    if(!passwordCheck) {
        return res.status(401).send({
            status: false,
            msg: 'Password is incorrect'
        })
    }

    const token = user.generateAuthToken();
    return res.status(200).send({
        status: true,
        token
    })
}
