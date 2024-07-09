import User from "./user.js";



export class UserMongoDAO{

    async create(usuario){
        let nuevoUsuario=await User.create(usuario)
        console.log(nuevoUsuario)
        return nuevoUsuario.toJSON()
    }

    async getBy(filtro) {
        return await User.findOne(filtro).lean();
    }

}