import { IdGenerator } from '../../services/IdGenerator'
import { AuthenticationData, Authenticator } from '../../services/Authenticator';
import { DBMovies } from '../../infra/database/movies/movies';
import { Categories, MoviesModel } from '../../models/movies';
import { MoviesBusiness } from './movies';
import { fixAddMovies } from '../../_fixtures/movies';
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
})