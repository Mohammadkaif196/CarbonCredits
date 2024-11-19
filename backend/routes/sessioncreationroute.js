import { Router } from "express";
import sessioncontroller from "../controllers/sessioncontroller.js";

const sessionroute = Router();

sessionroute.post("/sessioncreation", sessioncontroller);

export default sessionroute;
