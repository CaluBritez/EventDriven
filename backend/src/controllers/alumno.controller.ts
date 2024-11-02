import { Request, Response } from "express";
import { AlumnoService, IAlumno } from "../services/alumno.service";

export class AlumnoController {
    private alumnoService: AlumnoService;

    constructor() {
        this.alumnoService = new AlumnoService();
        this.registrarAlumno = this.registrarAlumno.bind(this);
        this.obtenerAlumnos = this.obtenerAlumnos.bind(this);
    }

    public async registrarAlumno(req: Request, res: Response): Promise<any> {
        const { nombre, apellido, email, password } = req.body as IAlumno;

        try {
            const { newAlumno, token } = await this.alumnoService.registrarAlumno({ nombre, apellido, email, password });

            return res.status(201).json({
                ok: true,
                message: 'Alumno registrado exitosamente',
                alumno: newAlumno,
                token
            });

        } catch (error: any) {
            if (error.message === 'El email ya existe') {
                return res.status(400).json({
                    ok: false,
                    message: 'El email ya existe',
                    error: error.message
                });
            }
            return res.status(500).json({
                ok: false,
                message: 'Error al registrar el alumno',
                error: error.message
            });
        }
    }

    public async obtenerAlumnos(req: Request, res: Response): Promise<any> {
        try {
            const alumnos = await this.alumnoService.obtenerAlumnos();
            return res.status(200).json({
                ok: true,
                message: 'Alumnos obtenidos exitosamente',
                alumnos
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Error al obtener alumnos',
                error
            });
        }
    }
};