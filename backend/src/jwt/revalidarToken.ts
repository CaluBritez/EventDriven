import { Request, Response } from "express";
import { generateJWT } from "./jwt";
import { Profesor } from "../models/profesor";
import { Alumno } from "../models/alumno";


const traerDatos = async (id: string) => {
    const [profesor, alumno] = await Promise.all([
        Profesor.findById(id),
        Alumno.findById(id)
    ]);
    const user = profesor || alumno;
    const role = profesor ? 'Profesor' : 'Alumno'
    return { user, role };
};

export const revalidarToken = async (req: Request, res: Response) => {

    const uid = req.uid as string;
    const name = req.nombre as string;
    const user = await traerDatos(uid);
    const token = await generateJWT(uid, name)

    res.json(
        {
            ok: true,
            uid: uid,
            name: name,
            token: token,
            email: user.user?.email,
            role: user.role
        });
};