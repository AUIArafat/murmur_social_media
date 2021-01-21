import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Relationship} from "../entity/Relationship";

export class RelationshipController {

    private relationshipRepository = getRepository(Relationship);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.relationshipRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.relationshipRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.relationshipRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let relationshipToRemove = await this.relationshipRepository.findOne(request.params.id);
        await this.relationshipRepository.remove(relationshipToRemove);
    }

}