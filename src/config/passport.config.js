import passport from "passport";
import local from "passport-local";
import passportjwt from "passport-jwt"
// import jwt from "jsonwebtoken" 
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

// 1) Definir la fn de configuracionw

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
                        //  res.setHeader('Content-Type','application/json');
                        //  return res.status(400).json({error:`Faltan datos`})
                        return done(null, false)
                    }
                
                    let existe=await userDAO.getBy({email})
                    console.log("PASSPORT BB:",existe)
                    if(existe){
                        //  res.setHeader('Content-Type','application/json');
                        //  return res.status(400).json({error:`Ya existen usuarios con email ${email}`})
                        return done(null, false)                      
                    }
                
                    // validaciones extra...
                    password=creaHash(password)
                
                    
                    let nuevoUsuario=await userDAO.create({nombre, email, password})
                    console.log("soy un nuevo ususario:",nuevoUsuario);
                
                    //  res.setHeader('Content-Type','application/json');
                    //  return res.status(200).json({payload:"Registro exitoso", nuevoUsuario});
                    // return res.redirect(`/login`)
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
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(401).json({error:`Credenciales incorrectas`})
                        return done(null, false)
                    }
                
                    // if(usuario.password!==creaHash(password)){
                        if(!validaPassword(usuario, password)){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(401).json({error:`Credenciales incorrectas`})
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