import { BaseError } from '../../models/error'
import { dbMovies, DBMovies } from '../../infra/database/movies/movies'
import { AddMoviesModel, Categories, movieCategories, MoviesModel } from '../../models/movies'
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

    async list(token: string): Promise<any> {
        const isAuthenticated = this.authenticator.getData(token)
        if (!isAuthenticated.id) throw new BaseError('Forbidden')

        return await this.dbMovies.list()
    }

    async getMovie(id: string, token: string) {
        const isAuthenticated = this.authenticator.getData(token)
        if (!isAuthenticated.id) throw new BaseError('Forbidden')

        return await this.dbMovies.getMovie(id)
    }

    async filter(filtersInput: any, token: string) {
        const filters = { ...filtersInput }
        const isAuthenticated = this.authenticator.getData(token)
        if (!isAuthenticated.id) throw new BaseError('Forbidden')

        const validParams = ['title', 'year_release', 'category', 'notation']
        Object.keys(filters).forEach(key => {
            if (!validParams.includes(key)) throw new BaseError(key + ' filter not allowed')
        });

        if (filters.notation) {
            if (filters.notation === 'gt')
                filters.notation = '>'
            else if (filters.notation === 'lt')
                filters.notation = '<'
            else
                throw new BaseError('Year release filter notation should be "gt" or "lt"')
        }
        
        if (filters.category) {
            const isAValidCategory = movieCategories.includes(filters.category.toUpperCase())
            if (!isAValidCategory) throw new BaseError(filters.category + ' is not a valid category.')

            let category
            switch (filters.category.toUpperCase()) {
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
            filters.category = category
        }
        return await this.dbMovies.filter(filters)
    }

    async delete(id: string, token: string): Promise<Boolean> {
        const isAuthenticated = this.authenticator.getData(token)
        if (!isAuthenticated.id) throw new BaseError('Forbidden')
        return await this.dbMovies.delete(id)
    }

    async update(updateMovie: Partial<AddMoviesModel>, id: string, token: string): Promise<Boolean> {
        const isAuthenticated = this.authenticator.getData(token)
        if (!isAuthenticated.id) throw new BaseError('Forbidden')

        Object.values(updateMovie).forEach(value => {
            if (!value) throw new BaseError('Values can not be empty')
        });
        let movie = { ...updateMovie }
        if (updateMovie.category) {
            let category
            const isAValidCategory = movieCategories.includes(updateMovie.category.toUpperCase())
            if (!isAValidCategory) throw new BaseError(updateMovie.category + ' is not a valid category.')

            switch (updateMovie.category.toUpperCase()) {
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
            movie = { ...movie, category: category }
        }
        return await this.dbMovies.update(movie, id)
    }
}
export const moviesBusiness = new MoviesBusiness(idGenerator, authenticator, dbMovies)