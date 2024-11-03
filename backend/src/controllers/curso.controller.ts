import { CursoService } from "../services/curso.service";
import { Request, Response } from "express";

const cursoService = new CursoService();

export class CursoController {

    public async publicarCurso(req: Request, res: Response) {
        try {
            const profesorId = req.uid as string;
            const { nombre, descripcion } = req.body;

            const curso = await cursoService.publicarCurso(
                { nombre, descripcion },
                profesorId
            );

            res.status(201).json({
                ok: true,
                curso
            });
        } catch (error: unknown) {
            console.log(error);
            res.status(500).json({
                ok: false,
                message: 'Error al publicar el curso',
                error: error
            });
        }
    }

    public async listarCursos(req: Request, res: Response) {
        try {
            const cursos = await cursoService.listarCursos();
            res.status(200).json(cursos);
        } catch (error: unknown) {
            console.log(error);
            res.status(500).json({
                ok: false,
                message: 'Error al obtener cursos',
                error: error
            });
        }
    }

    public async obtenerCursosPorProfe(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cursos = await cursoService.obtenerCursosPorProfe(id);
            res.status(200).json(cursos);
        } catch (error: unknown) {
            console.log(error);
            res.status(500).json({
                ok: false,
                message: 'Error al obtener cursos',
                error: error
            });
        }
    }

    public async inscribirAlumno(req: Request, res: Response) {
        try {
            const alumnoId = req.uid as string;
            const { id } = req.params;

            const curso = await cursoService.inscribirAlumno(id, alumnoId);

            res.status(200).json({
                ok: true,
                curso
            });
        } catch (error: unknown) {
            console.log(error);
            res.status(500).json({
                ok: false,
                message: 'Error al inscribir alumno en el curso',
                error: error
            });
        }
    }
};