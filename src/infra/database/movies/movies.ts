import { query } from "express";
import { AddMoviesModel, MoviesModel } from "../../../models/movies";
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

    async list(): Promise<any> {
        const result = await connection.query(`SELECT * FROM  ${this.tableName};`)
        return result[0]
    }

    async getMovie(id: string):Promise<any> {
        const result = await connection.query(`SELECT * FROM  ${this.tableName} WHERE id = '${id}';`)
        return result[0]
    }

    async filter(filters: any):Promise<any> {
        const query = []
        filters.title && query.push(`title = '${filters.title}'`)
        filters.category && query.push(`category = '${filters.category}'`)
        filters.notation && filters.year_release && query.push(`year_release ${filters.notation} '${filters.year_release}'`)
        !filters.notation && filters.year_release && query.push(`year_release = '${filters.year_release}'`)
        let where = ''
        query.forEach((part, index)=>{
            if(index !== query.length-1)
                where += part + ' and '
            else
                where += part 
        })
        console.log(where, query)
        
        const result = await connection.query(`
            SELECT * FROM  ${this.tableName} WHERE ${where};`)
        return result[0]
    }

    async delete(id:string): Promise<Boolean> {
        await connection.query(`DELETE FROM  ${this.tableName} WHERE id = '${id}';`)
        return true
    }

    async update(movie: Partial<AddMoviesModel>, id: string):Promise<Boolean> {
        let query = []
        movie.title && query.push(`title = '${movie.title}'`)
        movie.category && query.push(`category = '${movie.category}'`)
        movie.year_release && query.push(`year_release = '${movie.year_release}'`)
        let result =''
        query.forEach(piece =>{ 
            result += piece + ', ' })
        result = result.substring(0, result.length-2)
        await connection.query(`UPDATE ${this.tableName} set ${result} where id = '${id}';`)
        return true
    }
}
export const dbMovies = new DBMovies()