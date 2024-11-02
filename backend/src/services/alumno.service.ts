import { generateJWT } from "../jwt/jwt";
import { Alumno } from "../models/alumno";
import bcrypt from 'bcryptjs';

export interface IAlumno {
    nombre: string;
    apellido: string;
    email: string;
    password: string
}

export class AlumnoService {
    public async registrarAlumno(data: IAlumno) {
        try {
            const alumnoExiste = await Alumno.findOne({ email: data.email });
            if (alumnoExiste) {
                return {
                    ok: false,
                    message: 'El email ya existe',
                    error: 'El email ya existe'
                }
            }
            data.password = bcrypt.hashSync(data.password, 10);

            const newAlumno = new Alumno(data);
            await newAlumno.save();
            const token = await generateJWT(newAlumno.id, newAlumno.nombre);
            return { newAlumno, token };
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    public async obtenerAlumnos() {
        try {
            const alumnos = await Alumno.find();
            return alumnos
        } catch (error) {
            console.log(error);
            throw error
        }
    }
};