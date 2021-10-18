import * as jwt from 'jsonwebtoken'

export class Authenticator {
  public generateToken(input: AuthenticationData,
    expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN): string {
    const token = jwt.sign(
      {
        id: input.id,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    )
    return token
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as AuthenticationData
    const result = {
      id: payload.id
    }
    return result
  }
}

export interface AuthenticationData {
  id: string
}
export default new Authenticator()
export const authenticator = new Authenticator()