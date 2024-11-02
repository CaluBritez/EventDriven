import { Router } from "express";
import { AlumnoController } from "../controllers/alumno.controller";

const alumnoRouter = Router();
const ctrlAlumno = new AlumnoController();

alumnoRouter.post('/', ctrlAlumno.registrarAlumno);
alumnoRouter.get('/', ctrlAlumno.obtenerAlumnos);

export { alumnoRouter };