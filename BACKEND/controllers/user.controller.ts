import { Request, Response } from "express";
import { deleteUserById, getUserByEmail, getUserById, getUsers, newUser, updateUser } from "../services/user.service";

export const newUserHandler = async (req: Request, res: Response) => {
    try {
        const password = req.body.password;
        const user = await newUser({
            passwordHash: password,
            ...req.body
        });
        return res.status(201).send({
            status: true,
            user: {
                email: user.email,
                id: user.id
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            error
        })
    }
}

export const getUsersHandler = async (req: Request, res: Response) => {
    try {
        const email = req.query.email;
        let users;
        if(email) {
            users = await getUserByEmail(req.query.email as string);
        } else {
            users = await getUsers();
        }

        return res.status(200).send({
            status: true,
            users
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            error
        })
    }
}

export const getUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const user = await getUserById(req.params.id);
        if(!user) {
            return res.status(404).send({
                status: false,
                msg: 'Not found user'
            })
        }
        return res.status(201).send({
            status: true,
            user
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            error
        })
    }
}

export const deleteUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const user = await deleteUserById(req.params.id);
        if(!user) {
            return res.status(404).send({
                status: false,
                msg: 'Not found user'
            })
        }
        return res.status(201).send({
            status: true,
            user
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            error
        })
    }
}

export const updateUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        if(!user) {
            return res.status(404).send({
                status: false,
                msg: 'Not found user'
            })
        }
        return res.status(201).send({
            status: true,
            user
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            error
        })
    }
}

