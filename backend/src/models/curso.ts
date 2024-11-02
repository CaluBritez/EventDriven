import { Schema, model } from 'mongoose';

const CursoSchema = new Schema({
    nombre: {
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
    alumnos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Alumno'
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});

export const Curso = model('Curso', CursoSchema);