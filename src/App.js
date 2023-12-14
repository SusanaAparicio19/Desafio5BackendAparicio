import express from 'express';
import { engine } from 'express-handlebars';
import { ProductManagerMongo } from './ProductManagerMongo.js';
import { PORT, MONGODB_CNX_STR } from './config.js';
import { productsRouter } from './routers/productsRouter.js';
import { webRouter } from "./routers/webRouter.js"
import mongoose from 'mongoose';
import sfs from 'session-file-store'
import { apiRouter } from './routers/apirestRouter.js';
import { sessions } from './middlewares/sessions.js'

export const ProdMan = new ProductManagerMongo({ path: './db/products.json' });

await mongoose.connect(MONGODB_CNX_STR)
  console.log(`Base de Datos Conectada "${MONGODB_CNX_STR}"`)

const app = express()

app.listen(PORT, async () => {
  console.log(`Conectado al puerto ${PORT}`);
});

app.engine('handlebars', engine())

app.set('views', './views')
app.set(`view engine`, 'handlebars')

app.use(express.json());
app.use('/static', express.static('./static'))

app.use('/api/products', productsRouter);
app.use('/api/web', webRouter);
app.use('/api',apiRouter)
app.use(express.urlencoded({ extended: true }));

app.use(sessions)




/*import express from 'express';
import { ProductManager } from './ProductManager.js';
import { PORT, PRODUCTS_JASON } from './config.js';
import { engine } from 'express-handlebars';
import { webRouter } from "./routers/webRouter.js"

export const ProdMan = new ProductManager({ path: 'db/products.json' });

const app = express()
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use('/static', express.static('./static'))
app.use('/', webRouter) 
//app.use(express.json());

app.get('/products', async (request, response) => {
    try {
        const prd = await ProdMan.getProducts();
        const products = await JSON.parse(prd);

        // para verificar si se proporcionó un límite
        
        const limit = parseInt(request.query.limit);

        if (!isNaN(limit)) {
            return response.json(products.slice(0, limit));
        } else {
            return response.json(products);
        }
    } catch (error) {
        response.json({
            status: 'error',
            message: error.message,
        });
    }
});

app.get('/products/:id', async (request, response) => {
    const id = parseInt(request.params.id);    
    try {
      const prdId = await ProdMan.getProductById(id);
      response.json(prdId);
    } catch (error) {
      response.status(404).json({
        status: 'error',
        message: error.message
      });
    }
  });
  
app.get('/', (request, response) => {
    response.sendFile('index.html', {root: 'views'})
})

app.listen(PORT, async () => {
  console.log(`Conectado al puerto ${PORT}`);
});*/