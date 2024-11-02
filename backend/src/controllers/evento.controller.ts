import { EventoService, IEvento } from "../services/evento.service";
import { Request, Response } from "express";

export class EventoController {
    private cursoService: EventoService

    constructor() {
        this.cursoService = new EventoService();
        this.crearEvento = this.crearEvento.bind(this);
    }

    public async crearEvento(req: Request, res: Response): Promise<any> {
        const profesorId = req.uid as string;
        try {
            const { titulo, descripcion, cursoDestinado } = req.body;

            const eventoData: IEvento = { 
                titulo, 
                descripcion, 
                profesor: profesorId, 
                cursoDestinado 
            };

            const newEvent = await this.cursoService.crearEvento(eventoData);
            return res.status(201).json({
                ok: true,
                message: 'Evento creado exitosamente',
                newEvent
            })
        } catch (error: any) {
            return res.status(400).json({
                ok: false,
                message: error.message || 'Error al crear el evento'
            });
        }
    }
}