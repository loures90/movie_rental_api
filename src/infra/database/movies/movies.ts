import { MoviesModel } from "../../../models/movies";

export class DBMovies {
    constructor(){}
    async create(movie: MoviesModel):Promise<Boolean> {
        return true
    }

    async list() {
    }

    async getMovie() {
    }

    async filter() {
    }

    async delete() {
    }

    async update() {
    }
}
export const dbMovies = new DBMovies()