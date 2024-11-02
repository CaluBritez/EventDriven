import { Router } from "express";
import { ProfesorController, registrarProfesor } from "../controllers/profesor.controller";
import { validateRegister } from "../models/schema/userShema";
import { validarJwt } from "../jwt/validarJwt";

const profesorRouter = Router();
const ctrlProfesor = new ProfesorController();

profesorRouter.get('/', validarJwt, ctrlProfesor.obtenerProfesores);
profesorRouter.post('/', validateRegister, registrarProfesor);

export { profesorRouter };