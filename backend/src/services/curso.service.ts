import { Alumno } from "../models/alumno";
import { Curso } from "../models/curso";
import { Types } from "mongoose";

export interface ICurso {
    nombre: string
    descripcion: string
}

export class CursoService {
    public async publicarCurso(data: ICurso, profesorId: string) {
        try {
            const curso = new Curso({
                ...data, 
                profesor: profesorId
            });
            await curso.save();
            console.log(curso)
            return curso
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    public async listarCursos() {
        try {
            const cursos = await Curso.find().populate('profesor').populate('alumnos');
            return cursos
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    public async obtenerCursosPorProfe(profesorId: string) {
        try {
            const cursos = await Curso.find({ profesor: profesorId }).populate('alumnos');
            return cursos;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async inscribirAlumno(id: string, alumnoId: string) {
        try {
            const curso = await Curso.findById(id);
            if (!curso) {
                throw new Error('Curso no encontrado');
            }
            if (!curso.alumnos.includes(new Types.ObjectId(alumnoId))) {
                curso.alumnos.push(new Types.ObjectId(alumnoId));
                await curso.save();
            }
            return curso;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};