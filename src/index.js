import express from 'express';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import routes from "./routes/index.js";
import socketManager from './sockets/chat.socket.js';
import { initMongoDB } from "./persistence/daos/mongodb/models/connection.js";
import config from './config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  


initMongoDB();
app.use('/', routes);


const httpServer = app.listen(config.PORT, () => {
  console.log(`Server OK ${config.PORT}`);
});

socketManager(httpServer)
