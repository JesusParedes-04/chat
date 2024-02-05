import express from 'express';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import socketManager from './sockets/chat.socket.js';
import { initMongoDB } from "./persistence/daos/mongodb/models/connection.js";
import config from "./config.js"


const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  

router.get('/', (req, res) => {
  res.render('chat')
});

initMongoDB();
app.use('/', router);


const PORT = config.PORT
const httpServer = app.listen(PORT, () => {
  console.log(`Server OK ${PORT}`);
  socketManager(httpServer)
});

