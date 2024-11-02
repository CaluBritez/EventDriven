import { Profesor } from "../models/profesor";

export class ProfesorService {
    public async obtenerProfesores() {
        try {
            const profesores = await Profesor.find();
            return profesores
        } catch (error) {
            console.log(error);
            throw error
        }
    }
};