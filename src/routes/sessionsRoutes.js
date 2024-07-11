import express from "express";
import { SECRET } from "../utils/utilsLogin.js";
import passport from "passport";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const router = express.Router();



router.post('/registro', passport.authenticate("registro", {session: false, failureRedirect:"/api/sessions/errorRegistro"}) , async(req,res)=>{
    console.log("soy un req.user:",req.user); // asi cuando es exitoso el registro passport deja un req.user
    return res.redirect(`/registro?mensaje=Registro exitoso para ${req.user.nombre}`)
})
                
router.get("/errorRegistro", (req, res)=>{
    return res.redirect(`/registro?error=Error 500 - error inesperado`)
                
})


router.post('/login', passport.authenticate("login", {session: false, failureRedirect:"/api/sessions/errorLogin"}), async(req,res)=>{
    let usuario=req.user
    usuario={...usuario}
    delete usuario.password
    let token=jwt.sign(usuario, SECRET, {expiresIn:"1h"})
    console.log("esto es un token:", token)
    res.cookie("loginCookie", token, {maxAge:1000*60*60, signed:true, httpOnly:true})
    return res.status(200).json({
    usuarioLogueado: usuario,
})
                 
})



router.get("/errorLogin", (req, res)=>{
    return res.redirect(`/login?error=Error 500 - error inesperado`)
})

router.get('/logout',(req,res)=>{
    res.clearCookie('coderCookie');
    return res.redirect('/login'); 
});

export default router;