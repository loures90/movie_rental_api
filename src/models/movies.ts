export interface MoviesModel {
    id:string
    title: string
    year_release: string
    category: Categories
}

export interface AddMoviesModel {
    title: string
    year_release: string
    category: string
}

export enum Categories {
    Action = 'ACTION',
    Comedy = 'COMEDY',
    Drama = 'DRAMA',
    Fantasy = 'FANTASY',
    Horror = 'HORROR',
    Mystery = 'MYSTERY',
    Romance = 'ROMANCE',
    Thriller = 'THRILLER'
}
export const movieCategories = ['ACTION', 'COMEDY', 'DRAMA', 'FANTASY', 'HORROR', 'MYSTERY', 'ROMANCE', 'THRILLER']

export interface InputFilters {
    title?: string
    year_release?: string
    category?: string
    notation?: string
}