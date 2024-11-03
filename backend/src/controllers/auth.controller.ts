import { Request, Response } from "express";
import { generateJWT } from "../jwt/jwt";
import { Alumno } from "../models/alumno";
import { Profesor } from "../models/profesor";
import bcrypt from "bcryptjs";


export const loginUsuario = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        const [profesor, alumno] = await Promise.all([
            Profesor.findOne({ email }),
            Alumno.findOne({ email })
        ]);

        const user = profesor || alumno;

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe',
                error: 'El usuario no existe'
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Contraseña incorrecta',
                error: 'Contraseña incorrecta'
            });
        }

        const token = await generateJWT(user.id, user.nombre);

        res.json({
            ok: true,
            uid: user._id,
            name: user.nombre,
            email: email,
            role: profesor ? 'Profesor' : 'Alumno',
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error al intentar logearte',
            error
        });
    }
};