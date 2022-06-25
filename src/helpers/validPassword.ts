import bcrypt from 'bcryptjs'

export const validPassword = async (passwordToCheck: string, dbPassword:string) => {
  return bcrypt.compareSync(passwordToCheck, dbPassword)
}
