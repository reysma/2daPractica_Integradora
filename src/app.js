import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from "socket.io"
import __dirname from './utils.js'
import productRouter from './router/product.router.js'
import viewsProduct from './router/views.product.router.js'
import cartsRouter from './router/cart.router.js'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import bodyParser from 'body-parser'
import session from 'express-session'
import sessionRouter from  './router/session.router.js'

const PORT = 8080;
const app = express(); 

// traermos información de post como JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Configurar motor plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
const MONGO_URI = 'mongodb+srv://reysma:458260rey@cluster0.o8moagj.mongodb.net/?retryWrites=true&w=majority';

app.use(session({
  store: MongoStore.create({
      mongoUrl: MONGO_URI,
      mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true
      },
      ttl: 100
  }),
  secret: '1234567',
  resave: true,
  saveUninitialized: true
}))

//Carpeta Publica
app.use(express.static( __dirname + '/public'));

//Ruta de Vistas
app.use('/session', sessionRouter);
app.use('/products', productRouter) ;

app.use('/views_products', viewsProduct );

app.use('/carts', cartsRouter);

app.get('/', (req,res) => { res.send('Conecting')})

//Conexion a BD con Mongo Atlas

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_URI, 
  { dbName: "baseCRUD" },  
  (error) => { 
      if(error) {
        console.log('Not Found Connecting');
      process.exit();
        }
      
        app.listen(PORT, () => console.log('Server Listening...!!!'));
        const socketServer = new Server(httpServer)
        httpServer.on("error", (e) => console.log("ERROR: " + e))
    
        app.use((req, res, next) => {
            req.io = socketServer
            next()
    })   
    
    socketServer.on("connection", socket => {
      console.log("New client connected")
      socket.on("message", async data => {
      await messagesModel.create(data)
      let messages = await messagesModel.find().lean().exec()
      socketServer.emit("logs", messages)
      })
  })
