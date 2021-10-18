import { Request, Response } from 'express'
import { moviesBusiness } from '../../business/movies/movies'
import { BaseError } from '../../models/error'
import { authenticator, Authenticator } from '../../services/Authenticator'

export class MoviesController {
    constructor (
        readonly authenticator: Authenticator
    ){}
    authenticateToken(token: string | undefined): void{
        if (!token) throw new BaseError('Forbidden')
        const isAuthenticated = this.authenticator.getData(token)
        if (!isAuthenticated.id) throw new BaseError('Forbidden')
    } 

    async create(req: Request, res: Response) {
        try {
            this.authenticateToken(req.headers.authorization)
            if(!req.headers.authorization) throw new BaseError('Forbidden')
            await moviesBusiness.create(req.body)
            res.status(200).send(true)
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message})
        }
    }

    async list(req: Request, res: Response) {
        try {
            this.authenticateToken(req.headers.authorization)
            if(!req.headers.authorization) throw new BaseError('Forbidden')
            const result = await moviesBusiness.list()
            res.status(200).send(result)
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message})
        }
    }

    async getMovie(req: Request, res: Response) {
        try {
            this.authenticateToken(req.headers.authorization)
            if(!req.headers.authorization) throw new BaseError('Forbidden')
            const result = await moviesBusiness.getMovie(req.params.id)
            res.status(200).send(result)
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message})
        }
    }

    async filter(req: Request, res: Response) {
        try {
            this.authenticateToken(req.headers.authorization)
            if(!req.headers.authorization) throw new BaseError('Forbidden')
            const result = await moviesBusiness.filter(req.query)
            res.status(200).send(result)
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message})
        }
    }

    async delete(req: Request, res: Response) {
        try {
            this.authenticateToken(req.headers.authorization)
            if(!req.headers.authorization) throw new BaseError('Forbidden')
            await moviesBusiness.delete(req.params.id)
            res.status(200).send(true)
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message})
        }
    }

    async update(req: Request, res: Response) {
        try {
            this.authenticateToken(req.headers.authorization)
            if(!req.headers.authorization) throw new BaseError('Forbidden')
            await moviesBusiness.update(req.body, req.params.id)
            res.status(200).send(true)
        } catch (error: any) {
            res.status(error.status || 400).send({error: error.message})
        }
    }
}
export const moviesController = new MoviesController(authenticator)