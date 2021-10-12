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
    async update(movie: Partial<AddMoviesModel>, id: string):Promise<Boolean> {
        return Promise.resolve(true)
    }
}
const dbMovieStub = new DbMovieStub()

class AuthenticatorStub implements Authenticator {
    public generateToken(input: AuthenticationData, expiresIn: 'any'): string {
        return 'token'
    }
    public getData(token: string): AuthenticationData {
        return { id: 'abc123' }
    }
}
const authenticatorStub = new AuthenticatorStub()

const movieBusinessStub = new MoviesBusiness(idGeneratorStub, authenticatorStub, dbMovieStub)

describe('MOVIES', () => {
    describe('Add movie', () => {
        test('It should add a movie', async () => {
            const result = await movieBusinessStub.create(fixAddMovies, 'token')
            expect(result).toBe(true)
        })
        test('It should call AuthenticatorStub with correct values', async () => {
            const authSpy = jest.spyOn(authenticatorStub, 'getData')
            await movieBusinessStub.create(fixAddMovies, 'token')
            expect(authSpy).toHaveBeenCalledWith('token')
        })
        test('It should check if some input is empty valid', async () => {
            const result = movieBusinessStub.create({
                title: '',
                year_release: '2021',
                category: 'Action'
            }, 'token')
            await expect(result).rejects.toThrowError(BaseError)
        })
        test('It should check if some input is empty valid', async () => {
            const result = movieBusinessStub.create({
                title: 'any_title',
                year_release: '2021',
                category: 'not_a_category'
            }, 'token')
            await expect(result).rejects.toThrowError(BaseError)
        })
        test('It should call dbMovies with correct values', async () => {
            const movieSpy = jest.spyOn(dbMovieStub, 'create')
            await movieBusinessStub.create(fixAddMovies, 'token')
            expect(movieSpy).toHaveBeenCalledWith({ ...fixAddMovies, id: 'abc123', category: Categories.Action })
        })
    })
    describe('List movie', () => {
        test('It should list movies', async () => {
            const result = await movieBusinessStub.list('token')
            expect(result[0]).toEqual(expect.objectContaining({category: 'ACTION', id: 'any_id', title: 'any_title', year_release: '2021'}))
        })
        test('It should call AuthenticatorStub with correct values', async () => {
            const authSpy = jest.spyOn(authenticatorStub, 'getData')
            await movieBusinessStub.list('token')
            expect(authSpy).toHaveBeenCalledWith('token')
        })
        test('It should call dbMovies with correct values', async () => {
            const movieSpy = jest.spyOn(dbMovieStub, 'list')
            await movieBusinessStub.list('token')
            expect(movieSpy).toHaveBeenCalledWith()
        })
    })
    describe('Get a movie by id', () => {
        test('It should get a movie', async () => {
            const result = await movieBusinessStub.getMovie('abc123','token')
            expect(result).toBe(fixMovies)
        })
        test('It should call Authenticator with correct values', async () => {
            const authSpy = jest.spyOn(authenticatorStub, 'getData')
            await movieBusinessStub.getMovie('abc123','token')
            expect(authSpy).toHaveBeenCalledWith('token')
        })
        test('It should call dbMovies with correct values', async () => {
            const movieSpy = jest.spyOn(dbMovieStub, 'getMovie')
            await movieBusinessStub.getMovie('abc123','token')
            expect(movieSpy).toHaveBeenCalledWith('abc123')
        })
    })

    describe('Delete a movie by id', () => {
        test('It should delete a movie', async () => {
            const result = await movieBusinessStub.delete('abc123','token')
            expect(result).toBe(true)
        })
        test('It should call Authenticator with correct values', async () => {
            const authSpy = jest.spyOn(authenticatorStub, 'getData')
            await movieBusinessStub.delete('abc123','token')
            expect(authSpy).toHaveBeenCalledWith('token')
        })
        test('It should call dbMovies with correct values', async () => {
            const movieSpy = jest.spyOn(dbMovieStub, 'delete')
            await movieBusinessStub.delete('abc123','token')
            expect(movieSpy).toHaveBeenCalledWith('abc123')
        })
    })

    describe('Update movie', () => {
        test('It should add a movie', async () => {
            const result = await movieBusinessStub.update(fixAddMovies, 'abc123', 'token')
            expect(result).toBe(true)
        })
        test('It should call AuthenticatorStub with correct values', async () => {
            const authSpy = jest.spyOn(authenticatorStub, 'getData')
            await movieBusinessStub.update(fixAddMovies, 'abc123', 'token')
            expect(authSpy).toHaveBeenCalledWith('token')
        })
        test('It should check if some input is empty valid', async () => {
            const result = movieBusinessStub.update({
                title: '',
                year_release: '2021',
                category: 'Action'
            }, 'abc123', 'token')
            await expect(result).rejects.toThrowError(BaseError)
        })
        test('It should check if some input is empty valid', async () => {
            const result = movieBusinessStub.update({
                title: 'any_title',
                year_release: '2021',
                category: 'not_a_category'
            }, 'abc123', 'token')
            await expect(result).rejects.toThrowError(BaseError)
        })
        test('It should call dbMovies with correct values', async () => {
            const movieSpy = jest.spyOn(dbMovieStub, 'update')
            await movieBusinessStub.update(fixAddMovies, 'abc123', 'token')
            expect(movieSpy).toHaveBeenCalledWith({ ...fixAddMovies, category: Categories.Action }, 'abc123')
        })
    })
})