import { Router } from "express";
import viewsRoutes from "./views.routes.js"
const router = Router();

router.use("/", viewsRoutes);


export default router;