import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Relationship} from "../entity/Relationship";
import {User} from "../entity/User";
export class RelationshipController {

    private relationshipRepository = getRepository(Relationship);
    private userRepository = getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.relationshipRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.relationshipRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let user = await this.userRepository.findOne(request.body.user_id);
        let updateUser = user;
        try{
            let relationship = await this.relationshipRepository.save(request.body)
            updateUser.relationships.push(relationship);
            this.userRepository.merge(user, updateUser);
            const res = await this.userRepository.save(user);
            return response.json({
                type: 'success',
                message: 'Relationship added!!!',
                result: relationship,
                user: res
              })
        }
        catch (err){
            return response.status(500).json({type: 'error', message: err, err})
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let relationshipToRemove = await this.relationshipRepository.findOne(request.params.id);
        return await this.relationshipRepository.remove(relationshipToRemove);
    }

    async getFollowedRelation(request: Request, response: Response, next: NextFunction){
        return await this.relationshipRepository.find({
            where:[{followed_id:request.params.id}]
        })
    }

    async getFollowerRelation(request: Request, response: Response, next: NextFunction){
        return await this.relationshipRepository.find({
            where:[{follower_id:request.params.id}]
        })
    }
}