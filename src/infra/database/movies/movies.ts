import { MoviesModel } from "../../../models/movies";
import { connection } from "../../connection";

export class DBMovies {
    constructor(){}
    private tableName = 'tbMovies'
    async create(movie: MoviesModel):Promise<Boolean> {
        await connection.query(`INSERT INTO ${this.tableName} (id, title, year_release, category)
        VALUES (
            '${movie.id}', 
            '${movie.title}', 
            '${movie.year_release}', 
            '${movie.category}');`)
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