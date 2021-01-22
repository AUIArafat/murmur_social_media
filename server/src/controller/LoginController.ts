import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const jwtConfig = {
    secret: "dd5f3089-40c3-403d-af14-d0c228b05cb4"
  };

export class LoginController {
    private userRepository = getRepository(User);

    async login(request: Request, response: Response, next: NextFunction) {
        const email = request.body.email
        const password = request.body.password
        if (!email || !password) return response.status(400).json({type: 'error', message: 'email and password fields are essential for authentication.'})
        
        this.userRepository.findOne({
            where: [{email:request.body.email}]
        }).then((user) => {
            if (!user) {
                return response.status(403).json({type: 'error', message: 'User with provided email not found in database.'})
            }
            try{
                bcrypt.compare(password, user.password, (error, result) => {
                    if (error) return response.status(500).json({type: 'error', message: 'bcrypt error', error})
                    if (result) {
                      response.json({
                        type: 'success',
                        message: 'User logged in.',
                        user: {id: user.id, email: user.email, username: user.name},
                        token: jwt.sign({id: user.id, email: user.email, username: user.name}, jwtConfig.secret, {expiresIn: '7d'})
                      })
                    } else return response.status(403).json({type: 'error', message: 'Password is incorrect.'})
                  })
            }
            catch(error){
                return response.status(500).json({type: 'error', message: 'bcrypt error', error})
            }
        })
        .catch((error) => {
            return response.status(500).json({type: 'error', message: 'db error', error})
        })
    }

    async me(request: Request, response: Response, next: NextFunction) {
        const token = request.headers['x-access-token']
        if (!token) return response.status(400).json({type: 'error', message: 'x-access-token header not found.'})
        try{
            jwt.verify(token, jwtConfig.secret, (error, result) => {
                if (error) return response.status(403).json({type: 'error', message: 'Provided token is invalid.', error})
                return response.json({
                    type: 'success',
                    message: 'Provided token is valid.',
                    result
                })
            })
        }
        catch (error){
            return response.status(500).json({type: 'error', message: error, error})
        }
    }
}