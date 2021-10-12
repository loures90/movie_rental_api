export class BaseError extends Error {
    constructor(
        message: string,
        status?: number
    ){
        super()
    }
}