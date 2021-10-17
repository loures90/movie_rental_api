import { IdGenerator } from '../../services/IdGenerator'
import { AuthenticationData, Authenticator } from '../../services/Authenticator';
import { DBMovies } from '../../infra/database/movies/movies';
import { AddMoviesModel, Categories, MoviesModel } from '../../models/movies';
import { MoviesBusiness } from './movies';
import { fixAddMovies, fixMovies } from '../../_fixtures/movies';
import { BaseError } from '../../models/error';


class IdGeneratorStub implements IdGenerator {
    generate(): string {
        return 'abc123'
    }
}
const idGeneratorStub = new IdGeneratorStub()

class DbMovieStub extends DBMovies {
    create(movie: MoviesModel): Promise<Boolean> {
        return Promise.resolve(true)
    }
    list(): Promise<any> {
        return Promise.resolve([fixMovies])
    }
    getMovie(): Promise<any> {
        return Promise.resolve(fixMovies)
    }
    delete(id:string): Promise<Boolean> {
        return Promise.resolve(true)
    }
    update(movie: Partial<AddMoviesModel>, id: string):Promise<Boolean> {
        return Promise.resolve(true)
    }
    filter(filters: any):Promise<any> {
        return Promise.resolve([fixMovies])
    }

}
const dbMovieStub = new DbMovieStub()

const movieBusinessStub = new MoviesBusiness(idGeneratorStub, dbMovieStub)

describe('MOVIES', () => {
    describe('Add movie', () => {
        test('It should add a movie', async () => {
            const result = await movieBusinessStub.create(fixAddMovies)
            expect(result).toBe(true)
        })
        test('It should check if some input is empty valid', async () => {
            const result = movieBusinessStub.create({
                title: '',
                year_release: '2021',
                category: 'Action'
            })
            await expect(result).rejects.toThrowError(BaseError)
        })
        test('It should check if some input is empty valid', async () => {
            const result = movieBusinessStub.create({
                title: 'any_title',
                year_release: '2021',
                category: 'not_a_category'
            })
            await expect(result).rejects.toThrowError(BaseError)
        })
        test('It should call dbMovies with correct values', async () => {
            const movieSpy = jest.spyOn(dbMovieStub, 'create')
            await movieBusinessStub.create(fixAddMovies)
            expect(movieSpy).toHaveBeenCalledWith({ ...fixAddMovies, id: 'abc123', category: Categories.Action })
        })
    })
    describe('List movie', () => {
        test('It should list movies', async () => {
            const result = await movieBusinessStub.list()
            expect(result[0]).toEqual(expect.objectContaining({category: 'ACTION', id: 'any_id', title: 'any_title', year_release: '2021'}))
        })
        test('It should call dbMovies with correct values', async () => {
            const movieSpy = jest.spyOn(dbMovieStub, 'list')
            await movieBusinessStub.list()
            expect(movieSpy).toHaveBeenCalledWith()
        })
    })
    describe('Get a movie by id', () => {
        test('It should get a movie', async () => {
            const result = await movieBusinessStub.getMovie('abc123')
            expect(result).toBe(fixMovies)
        })
        test('It should call dbMovies with correct values', async () => {
            const movieSpy = jest.spyOn(dbMovieStub, 'getMovie')
            await movieBusinessStub.getMovie('abc123')
            expect(movieSpy).toHaveBeenCalledWith('abc123')
        })
    })
    describe('Delete a movie by id', () => {
        test('It should delete a movie', async () => {
            const result = await movieBusinessStub.delete('abc123')
            expect(result).toBe(true)
        })
        test('It should call dbMovies with correct values', async () => {
            const movieSpy = jest.spyOn(dbMovieStub, 'delete')
            await movieBusinessStub.delete('abc123')
            expect(movieSpy).toHaveBeenCalledWith('abc123')
        })
    })
    describe('Update movie', () => {
        test('It should add a movie', async () => {
            const result = await movieBusinessStub.update(fixAddMovies, 'abc123')
            expect(result).toBe(true)
        })
        test('It should check if some input is empty valid', async () => {
            const result = movieBusinessStub.update({
                title: '',
                year_release: '2021',
                category: 'Action'
            }, 'abc123')
            await expect(result).rejects.toThrowError(BaseError)
        })
        test('It should check if some input is empty valid', async () => {
            const result = movieBusinessStub.update({
                title: 'any_title',
                year_release: '2021',
                category: 'not_a_category'
            }, 'abc123')
            await expect(result).rejects.toThrowError(BaseError)
        })
        test('It should call dbMovies with correct values', async () => {
            const movieSpy = jest.spyOn(dbMovieStub, 'update')
            await movieBusinessStub.update(fixAddMovies, 'abc123')
            expect(movieSpy).toHaveBeenCalledWith({ ...fixAddMovies, category: Categories.Action }, 'abc123')
        })
    })

    describe('Delete a movie by id', () => {
        const filterStub = {
            title: 'any_title',
            category: 'Comedy',
            year_release: '2001',
            notation: 'gt'
        }
        test('It should delete a movie', async () => {
            const result = await movieBusinessStub.filter(filterStub)
            expect(result[0]).toEqual(expect.objectContaining({category: 'ACTION', id: 'any_id', title: 'any_title', year_release: '2021'}))
        })
        test('It should check if filters are valid', async () => {
            const result = movieBusinessStub.filter({ ...filterStub, otherFilter: 'any'})
            await expect(result).rejects.toThrowError(BaseError)
        })
        test('It should check if notation is valid', async () => {
            const result = movieBusinessStub.filter({ ...filterStub, notation: '>>>'})
            await expect(result).rejects.toThrowError(BaseError)
        })
        test('It should check if some input is empty valid', async () => {
            const result = movieBusinessStub.filter({
                title: 'any_title',
                year_release: '2021',
                category: 'not_a_category',
                notation: 'gt'
            })
            await expect(result).rejects.toThrowError(BaseError)
        })
        test('It should call dbMovies with correct values', async () => {
            const movieSpy = jest.spyOn(dbMovieStub, 'filter')
            await movieBusinessStub.filter(filterStub)
            expect(movieSpy).toHaveBeenCalledWith({ ...filterStub, category: 'COMEDY', notation: '>'})
        })
        test('It should call dbMovies with correct values', async () => {
            const secondFilterStub = { 
                title: 'any_title',
                category: 'Comedy',
                year_release: '2001'
            }
            const movieSpy = jest.spyOn(dbMovieStub, 'filter')
            await movieBusinessStub.filter(secondFilterStub)
            expect(movieSpy).toHaveBeenCalledWith({ ...secondFilterStub, category: 'COMEDY'})
        })
    })
})