import { CursoService } from "../services/curso.service";
import { Request, Response } from "express";

export class CursoController {

    private cursoService: CursoService;

    constructor() {
        this.cursoService = new CursoService();
        this.publicarCurso = this.publicarCurso.bind(this);
        this.listarCursos = this.listarCursos.bind(this);
        this.obtenerCursosPorProfe = this.obtenerCursosPorProfe.bind(this);
        this.inscribirAlumno = this.inscribirAlumno.bind(this);
    }

    public async publicarCurso(req: Request, res: Response): Promise<any> {
        const profesorId = req.uid as string;

        try {
            const { nombre, descripcion } = req.body;

            const curso = await this.cursoService.publicarCurso(
                { nombre, descripcion },
                profesorId
            );

            return res.status(201).json({
                ok: true,
                curso
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Error al publicar el curso',
                error
            });
        }
    }

    public async listarCursos(req: Request, res: Response): Promise<any> {
        try {
            const cursos = await this.cursoService.listarCursos();
            return res.status(200).json(cursos);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Error al obtener cursos',
                error
            });
        }
    }

    public async obtenerCursosPorProfe(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const cursos = await this.cursoService.obtenerCursosPorProfe(id);
            return res.status(200).json(cursos);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Error al obtener cursos',
                error
            });
        }
    }

    public async inscribirAlumno(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const alumnoId = req.body.alumnoId as string;

            const curso = await this.cursoService.inscribirAlumno(id, alumnoId);

            return res.status(200).json({
                ok: true,
                curso
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Error al inscribir alumno en el curso',
                error
            });
        }
    }
};