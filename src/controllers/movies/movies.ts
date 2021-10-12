import { Request, Response } from "express";

export class MoviesController {
    async create(req: Request, res: Response) {
        try {
            res.status(200).send(true);
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message});
        }
    }

    async list(req: Request, res: Response) {
        try {
            res.status(200).send(true);
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message});
        }
    }

    async getMovie(req: Request, res: Response) {
        try {
            res.status(200).send(true);
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message});
        }
    }

    async filter(req: Request, res: Response) {
        try {
            res.status(200).send(true);
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message});
        }
    }

    async delete(req: Request, res: Response) {
        try {
            res.status(200).send(true);
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message});
        }
    }

    async update(req: Request, res: Response) {
        try {
            res.status(200).send(true);
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message});
        }
    }
}
export const moviesController = new MoviesController()