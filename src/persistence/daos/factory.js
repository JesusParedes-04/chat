import MessageDaoMongo from "./mongodb/messages.dao.js";
import { initMongoDB } from "./mongodb/models/connection.js";

let messageDao
let persistence = process.argv[2] || "mongo";

const initMongoPersistence = async () => {
    await initMongoDB();
    messageDao = new MessageDaoMongo();
  };
  
  switch (persistence) {
    
    case "mongo":
      await initMongoPersistence();
      break;
    default:
      throw new Error("Invalid persistence");
  }
  
  export default { messageDao };