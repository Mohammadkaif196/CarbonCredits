import { Router } from "express";
import sessionverifycontroller from "../controllers/sesssionverify.js";

const sessionverifyrouter = Router();

sessionverifyrouter.post("/sessionverify", sessionverifycontroller);

export default sessionverifyrouter;
