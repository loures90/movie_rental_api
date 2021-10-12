export interface MoviesModel {
    id:string
    title: string
    year_release: string
    gender: string
}

export interface AddMoviesModel extends Omit<MoviesModel, 'id'>{
}