import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
const bcrypt = require("bcrypt");
export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        this.userRepository.findOne({where: [{email:request.body.email}]})
        .then((user) =>{
            if (!user) {
                bcrypt.hash(request.body.password, 10, (_err, hash) => {
                    request.body.password = hash;
                    this.userRepository.save(request.body)
                    .then(() => {return response.json({message: "User Added!"})})
                    .catch(error => {return response.status(500).json({type: 'error', message: 'bcrypt error', error})});
                });
            } 
            else {
                return response.status(403).json({type: 'error', message: 'User already exists'})
            }
        })
        .catch(error => {
            return response.status(500).json({type: 'error', message: 'db error', error})
        });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

    async login(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne({
            where: [{email:request.body.email, password:request.body.password}]
        });
    }

}