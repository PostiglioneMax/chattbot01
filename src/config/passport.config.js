import passport from "passport";
import local from "passport-local";
import passportjwt from "passport-jwt"
import { UserMongoDAO as UserDAO } from "../models/userMongoDAO.js";
import { SECRET, creaHash, validaPassword } from "../utils/utilsLogin.js";

const userDAO = new UserDAO()

const buscaToken=(req)=>{
    let token=null

    if(req.signedCookies.coderCookie){
        console.log("busca token...!!!")
        token=req.signedCookies.coderCookie
    }

    return token
}

export const initPassport=()=>{

    passport.use(
        "registro",
        new local.Strategy(
            {
                usernameField:"email",
                passReqToCallback: true
            },
            async function(req, username, password, done){
                try{
                    let {nombre, email} =req.body
                    console.log("PASSPORT BB:",nombre, email)
                    if(!nombre || !email){

                        return done(null, false)
                    }
                
                    let existe=await userDAO.getBy({email})
                    console.log("PASSPORT BB:",existe)
                    if(existe){
                        
                        return done(null, false)                      
                    }
                
                    // validaciones extra...
                    password=creaHash(password)
                
                    
                    let nuevoUsuario=await userDAO.create({nombre, email, password})
                    console.log("soy un nuevo ususario:",nuevoUsuario);
                
                    return done(null, nuevoUsuario)
                } catch(error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField: "email"
            },
            async (username, password, done)=>{
                try {
                    let usuario=await userDAO.getBy({email:username})
                    if(!usuario){
                        return done(null, false)
                    }
                
                        if(!validaPassword(usuario, password)){
                        return done(null, false)
                    }
                
                    return done(null, usuario)
                                    
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "jwt",
        new passportjwt.Strategy(
            {
                secretOrKey: SECRET,
                jwtFromRequest: new passportjwt.ExtractJwt.fromExtractors([buscaToken])
            },
            async (contenidoToken, done)=>{
                try {
                    console.log("passport")
                    return done(null, contenidoToken)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )


}