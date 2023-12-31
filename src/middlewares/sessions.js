import session from 'express-session'
import connectMongo from 'connect-mongo'
import { MONGODB_CNX_STR} from '../config.js'

const store = connectMongo.create({
  mongoUrl: MONGODB_CNX_STR,
  ttl: 60 * 60 * 24 // 1d
})

export const sessions = session({
  store,
  secret: 'MySecret',
  resave: false,
  saveUninitialized: false
})

export function soloLogueadosApi(req, res, next) {
  if (!req.session['user']) {
    return res.status(400).json({ status: 'error', message: 'necesita iniciar sesion' })
  }
  next()
}

