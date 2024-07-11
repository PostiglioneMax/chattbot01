import bcrypt from "bcrypt"


export const SECRET = "CoderCoder123"
export const creaHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validaPassword = (usuario, password) => bcrypt.compareSync(password, usuario.password)
