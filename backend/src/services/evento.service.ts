import { Curso } from "../models/curso";
import { Evento } from "../models/evento";

export interface IEvento {
    titulo: string;
    descripcion: string;
    profesor: string;
    cursoDestinado: {
        _id: string;
    };
}

export class EventoService {
    public async crearEvento(data: IEvento) {
        try {
            const curso = await Curso.findOne({ _id: data.cursoDestinado, profesor: data.profesor });
            if (!curso) {
                throw new Error('El curso no pertenece a este profesor o no existe');
            }
            const newEvento = new Evento(data);
            await newEvento.save();

            // this.emitirEventoCreacion(newEvento);

            return newEvento
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    private async notificarAlumnos(alumnos: string[], evento: IEvento) {
        
    }
};