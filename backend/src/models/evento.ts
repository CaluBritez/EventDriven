import { model, Schema } from "mongoose";

const EventoSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    profesor: {
        type: Schema.Types.ObjectId,
        ref: 'Profesor',
        required: true
    },
    cursoDestinado: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export const Evento = model('Evento', EventoSchema)