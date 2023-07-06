import { Router } from "express";
const router = Router();
import messagesManager from '../dao/mongodb-managers/MessagesManager.js';

const chatMessagesRouter = (socketServer) => {
  socketServer.on('connection', async (socket) => {
    console.log(`New connection: ${socket.id}`);

    // Bring chat history on connection
    try{
      const history = await messagesManager.getMessages();
      // Send history
      socketServer.emit('history', history);
    } catch (error) {
      console.error(`Error trying bring the messages history: ${error}`);
    };

    // Send message
    socket.on('message', async (msg) => {
        try{
          const newMessage = await messagesManager.addMessage(msg);
          // Send last message
          socketServer.emit('currentMessage', newMessage);
        } catch (error) {
          console.error(`Error trying send message: ${error}`);
        };
    });
  });

  router.get("/", async (req, res) => {
    res.status(200).render('chat', {
      script: 'chat',
      style: 'chat',
      title: 'WannaChat!'
    });
  });

  return router
};

export default chatMessagesRouter;