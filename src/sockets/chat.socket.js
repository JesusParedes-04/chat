
import { Server } from 'socket.io';
import MessageManager from '../persistence/daos/mongodb/messages.dao.js';

const messagesDao = new MessageManager();

const socketManager = (httpServer) => {

  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socket) => {

    socket.on('chat:message', async (msg) => {
      const newMessage = await messagesDao.create(msg);
      socketServer.emit('message', newMessage);
    });

    socket.emit('msg', 'bienvenido al chat');

    socket.on('newUser', (user) => {
      socket.broadcast.emit('newUser', user);
    });

    socket.on('chat:typing', (user) => {
      socket.broadcast.emit('chat:typing', user);
    });
  });
};

export default socketManager;