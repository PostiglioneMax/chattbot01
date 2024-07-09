export const auth=(accesos=[])=>{
    return (req, res, next)=>{
        accesos=accesos.map(a=>a.toLowerCase())

        if(accesos.includes("public")){
            return next()
        }

        if(!req.user || !req.user.rol){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`No existen usuarios autenticados`})
        }

        if(!accesos.includes(req.user.rol.toLowerCase())){
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recurso`})
        }

        next()
    }
}


//para ampliar
export const passportCall = (estrategia) => {
    return function (req, res, next) {
      passport.authenticate(estrategia, function (err, user, info, status) {
        if (err) { return next(err) }
        if (!user) {
          // res.setHeader('Content-Type','application/json');
          return res.status(401).json({ error: 'Credenciales incorrectas', detalle: info.message });
          // return res.status(401).json({
          //     error:info.message?info.message:info.toString(),
          //     detalle:info.detalle?info.detalle:"-",
  
          // })
        }
        // res.redirect('/account');
        req.user = user
        next()
      })(req, res, next);
    }
  }