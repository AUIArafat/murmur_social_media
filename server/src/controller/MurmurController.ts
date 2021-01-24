import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Murmur} from "../entity/Murmur";

export class MurmurController {

    private murmurRepository = getRepository(Murmur);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.murmurRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.murmurRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.murmurRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let murmurToRemove = await this.murmurRepository.findOne(request.params.id);
        await this.murmurRepository.remove(murmurToRemove);
    }

    async getByUserId(request: Request, response: Response, next: NextFunction) {
        return this.murmurRepository.find({
            where: [{user_id:request.query.user_id}],
            order: { created_at: 'DESC' }
        });
    }

}