import { Request,Response } from 'express';
import UserService from '../services/userService';

const userService = new UserService();

export const getUserById = async (req: Request, res:Response) => {
    userService.getUserById(req.params.id)
    .then((data) => {
        res.status(200).json({data : data , status : true})
    })
    .catch((error:any) => {
        res.status(400).json({error : error.message , status : false})
    });
}

export const getAll = async (req: Request, res:Response) => {
    userService.getAllUser()
    .then((data) => {
        res.status(200).json({data : data , status : true})
    })
    .catch((error:any) => {
        res.status(400).json({error : error.message , status : false})
    });
}

export const createUser = async (req: Request, res:Response) => {
    userService.createUser(req.body)
    .then((data) => {
        res.status(200).json({message: `create success`, data : data , status : true})
    })
    .catch((error:any) => {
        res.status(400).json({error : error.message , status : false})
    });
}

export const updateUser = async (req: Request, res:Response) => {
    userService.updeateUser(req.body)
    .then((data) => {
        res.status(200).json({message: `update success`, data : data , status : true})
    })
    .catch((error:any) => {
        res.status(400).json({error : error.message , status : false})
    });
}

export const deleteUser = async (req: Request, res:Response) => {
    console.log('req.params.id',req.params.id)
    userService.deleteUser(req.params.id)
    .then((data) => {
        res.status(200).json({message: `delete success`, data : data , status : true})
    })
    .catch((error:any) => {
        res.status(400).json({error : error.message , status : false})
    });
}


