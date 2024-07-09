import { Router } from 'express';
import { auth } from '../middleware/auth.js';

const router = Router();


router.get('/registro', auth(["public"]), (req,res)=>{

    res.status(200).render('registro')
})

router.get('/login', auth(["public"]), (req,res)=>{

    res.status(200).render('login')
})

export default router;