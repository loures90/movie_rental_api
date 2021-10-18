import { AddMoviesModel, Categories, MoviesModel } from '../models/movies'

export const fixMovies: MoviesModel = {
    id: 'any_id',
    title: 'any_title',
    year_release: '2021',
    category: Categories.Action
}

export const fixAddMovies: AddMoviesModel = {
    title: 'any_title',
    year_release: '2021',
    category: 'Action'
}
