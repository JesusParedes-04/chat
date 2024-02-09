

import { getAllMessages } from "../services/messages.services.js";


export const chat = async (req, res) => {

  try {
    const messages = await getAllMessages();
    res.render('chat', { title: 'Chat', messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}