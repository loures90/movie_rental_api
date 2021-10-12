import { BaseError } from '../../models/error'
import { dbMovies, DBMovies } from '../../infra/database/movies/movies'
import { AddMoviesModel, Categories, movieCategories } from '../../models/movies'
import { authenticator, Authenticator } from '../../services/Authenticator'
import { idGenerator, IdGenerator } from '../../services/IdGenerator'

export class MoviesBusiness {
    constructor(
        readonly idGenerator: IdGenerator,
        readonly authenticator: Authenticator,
        readonly dbMovies: DBMovies,
    ) { }
    async create(inputMovie: AddMoviesModel, token: string): Promise<Boolean> {
        const isAuthenticated = this.authenticator.getData(token)
        if (!isAuthenticated.id) throw new BaseError('Forbidden')

        if (!inputMovie.title || !inputMovie.year_release || !inputMovie.category)
            throw new BaseError('Values can not be empty')
        
        const isAValidCategory = movieCategories.includes(inputMovie.category.toUpperCase())
        if (!isAValidCategory) throw new BaseError(inputMovie.category + ' is not a valid category.')

        let category
        switch (inputMovie.category.toUpperCase()) {
            case 'ACTION':
                category = Categories.Action
                break;
            case 'COMEDY':
                category = Categories.Comedy
                break;
            case 'DRAMA':
                category = Categories.Drama
                break;
            case 'FANTASY':
                category = Categories.Fantasy
                break;
            case 'HORROR':
                category = Categories.Horror
                break;
            case 'MYSTERY':
                category = Categories.Mystery
                break;
            case 'ROMANCE':
                category = Categories.Romance
                break;
            case 'THRILLER':
                category = Categories.Thriller
                break;
            default:
                category = Categories.Thriller
                break;
        }

        const id = this.idGenerator.generate()
        const movie = { id: id, ...inputMovie, category: category }
        await this.dbMovies.create(movie)
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
export const moviesBusiness = new MoviesBusiness(idGenerator, authenticator, dbMovies)