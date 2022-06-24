import bcrypt from 'bcrypt-nodejs'
export const validPassword = async (passwordToCheck: string, dbPassword:string) => {
  return bcrypt.compareSync(passwordToCheck, dbPassword)
}
