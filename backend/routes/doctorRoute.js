// routes/doctorRoute.js

import express from 'express';
import { doctorList } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);  // <-- THIS is missing in your backend

export default doctorRouter;
