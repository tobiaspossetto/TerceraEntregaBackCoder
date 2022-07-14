import bcrypt from 'bcryptjs'
export const encryptPassword = (password: string) => {
  return bcrypt.hashSync(password, 10)
}
