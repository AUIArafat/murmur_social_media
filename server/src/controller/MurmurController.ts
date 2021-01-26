import {createQueryBuilder, getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Murmur} from "../entity/Murmur";
import { User } from "../entity/User";

export class MurmurController {

    private murmurRepository = getRepository(Murmur);

    async all(request: Request, response: Response, next: NextFunction) {
        return await this.murmurRepository.query(`select M.*, U.name from murmur M LEFT JOIN User U ON U.id=M.user_id`)
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.murmurRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.murmurRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let murmurToRemove = await this.murmurRepository.findOne(request.params.id);
        try{
            await this.murmurRepository.remove(murmurToRemove);
            return response.json({
                type:'success',
                message: 'murmur deleted succesfully',
            })
        }
        catch (err){
            return response.status(500).json({type: 'error', message: err, err})
        }
    }

    async getByUserId(request: Request, response: Response, next: NextFunction) {
        return this.murmurRepository.find({
            where: [{user_id:request.query.user_id}],
            order: { created_at: 'DESC' }
        });
    }

    async likeMurmur(request: Request, response: Response, next: NextFunction) {
        let murmur = await this.murmurRepository.findOne(request.params.id);
        murmur.like_count = murmur.like_count+1;
        try{
            await this.murmurRepository.save(murmur)
            .then((murmur) => {
                return response.json({
                    type: 'success',
                    message: 'Murmur like count updated added!!!',
                    result: murmur,
                  })
            })
        }
        catch (err){

        }
    }

}