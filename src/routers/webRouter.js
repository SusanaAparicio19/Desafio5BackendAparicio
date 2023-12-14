import { Router } from 'express'
import { ProdMan } from "../App.js"
export const webRouter = Router()


webRouter.get('/', (req, res) => {
  const user = req.session && req.session.user; // Verificar si req.session está definido
  if (user) {
    const mensajeBienvenida = `Bienvenido, ${user.nombre} ${user.apellido} (${user.email})`;
    res.render('main', { titulo: 'Productos', mensajeBienvenida });
  } else {
    res.redirect('/login'); // Redirigir a la página de inicio de sesión si el usuario no está autenticado
  }
});

/*
webRouter.get('/', (req, res) => {
  const user = req.session['user'];
  if (user) {
    const mensajeBienvenida = `Bienvenido, ${user.nombre} ${user.apellido} (${user.email})`;
    res.render('main', { titulo: 'Productos', mensajeBienvenida });
  } else {
    // Manejar el caso en el que el usuario no está autenticado
    res.redirect('/login'); // Por ejemplo, redireccionar a una página de inicio de sesión
  }
});*/

/*
webRouter.get('/', (req, res) => {
    const user = req.session['user'];
    const productos = ProdMan.getProducts();
    const mensajeBienvenida = user ? `Bienvenido, ${user.nombre} ${user.apellido} (${user.email})` : '';
  
    res.render('main', { titulo: 'Productos', mensajeBienvenida });
  });
*/
webRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { titulo: 'Productos En Tiempo Real' })
})