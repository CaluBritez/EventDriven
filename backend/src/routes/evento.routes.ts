import { Router } from "express";
import { validarJwt } from "../jwt/validarJwt";
import { EventoController } from "../controllers/evento.controller";

const eventRouter = Router();
const eventCtrl = new EventoController();

eventRouter.post('/', validarJwt, eventCtrl.crearEvento);

export { eventRouter }