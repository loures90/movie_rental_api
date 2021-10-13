import { Request, Response } from "express";
import { moviesBusiness } from "../../business/movies/movies";
import { BaseError } from "../../models/error";

export class MoviesController {
    async create(req: Request, res: Response) {
        try {
            if(!req.headers.authorization) throw new BaseError('Forbidden')
            await moviesBusiness.create(req.body, req.headers.authorization)
            res.status(200).send(true);
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message});
        }
    }

    async list(req: Request, res: Response) {
        try {
            if(!req.headers.authorization) throw new BaseError('Forbidden')
            const result = await moviesBusiness.list(req.headers.authorization)
            res.status(200).send(result);
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message});
        }
    }

    async getMovie(req: Request, res: Response) {
        try {
            if(!req.headers.authorization) throw new BaseError('Forbidden')
            const result = await moviesBusiness.getMovie(req.params.id, req.headers.authorization)
            res.status(200).send(result);
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message});
        }
    }

    async filter(req: Request, res: Response) {
        try {
            if(!req.headers.authorization) throw new BaseError('Forbidden')
            const result = await moviesBusiness.filter(req.query, req.headers.authorization)
            res.status(200).send(result);
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message});
        }
    }

    async delete(req: Request, res: Response) {
        try {
            if(!req.headers.authorization) throw new BaseError('Forbidden')
            await moviesBusiness.delete(req.params.id, req.headers.authorization)
            res.status(200).send(true);
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message});
        }
    }

    async update(req: Request, res: Response) {
        try {
            if(!req.headers.authorization) throw new BaseError('Forbidden')
            await moviesBusiness.update(req.body, req.params.id, req.headers.authorization)
            res.status(200).send(true);
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message});
        }
    }
}
export const moviesController = new MoviesController()