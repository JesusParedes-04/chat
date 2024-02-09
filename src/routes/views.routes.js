import {Router} from "express"
import * as controller from '../controllers/view.controller.js'



const router = Router();



router.get('/', controller.chat) 


export default router;