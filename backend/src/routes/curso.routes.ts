import { Router } from "express";
import { validarJwt } from "../jwt/validarJwt";
import { CursoController } from "../controllers/curso.controller";

const cursoRouter = Router();
const cursoCtrl = new CursoController();

cursoRouter.post('/', validarJwt, cursoCtrl.publicarCurso);
cursoRouter.get('/', validarJwt, cursoCtrl.listarCursos);
cursoRouter.get('/:id', validarJwt, cursoCtrl.obtenerCursosPorProfe);
cursoRouter.post('/inscribir/:id', validarJwt, cursoCtrl.inscribirAlumno);

export { cursoRouter }