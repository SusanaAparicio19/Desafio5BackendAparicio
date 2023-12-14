import { Router } from 'express';
import { UsersManager } from '../models/User.js';
import { sessions } from '../middlewares/sessions.js';
export const sessionsRouter = Router()


sessionsRouter.get('/login', function loginView(req, res) {
  res.render('login.handlebars', {
    pageTitle: 'Login'
  })
})

sessionsRouter.post('/login', async (req, res) => {

    const { email, password } = req.body
  
    let datosUsuario
  
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      datosUsuario = {
        email: 'admin',
        nombre: 'admin',
        apellido: 'admin',
        rol: 'admin'
      }
    } else {
      const usuario = await UsersManager.findOne({ email }).lean()
  
      if (!usuario || password !== usuario.password) {
        return res.status(400).json({ status: 'error', message: 'login failed' })
      }
  
      datosUsuario = {
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: 'usuario'
      }
    }
  
    req.session['user'] = datosUsuario;
    res.status(201).json({ status: 'success', message: 'login success' })
  })
  
  sessionsRouter.get('/current', (req, res) => {
    if (req.session['user']) {
      return res.json(req.session['user'])
    }
    res.status(400).json({ status: 'error', message: 'No hay sesion iniciada aun' })
  })
 
  sessionsRouter.delete('/current', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ status: 'logout error', body: err })
      }
      res.json({ status: 'success', message: 'logout OK' })
    })
  })

sessionsRouter.post('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login')
  })
})
