import express from 'express';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js';
import socketManager from './sockets/chat.socket.js';
import routes from "./routes/views.routes.js"
import { PORT,} from "./config.js";
import { initMongoDB } from "./persistence/daos/mongodb/models/connection.js";



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  

app.use('/', viewsRouter);

initMongoDB();

app.use("/", routes);

const httpServer = app.listen(PORT, () => {
  console.log(`Server OK ${PORT}`);
  socketManager(httpServer)
});

