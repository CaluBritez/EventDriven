import { Request, Response } from "express";
import { generateJWT } from "./jwt";


export const revalidarToken = async (req: Request, res: Response) => {

    const uid = req.uid as string;
    const name = req.nombre as string;
    
    const token = await generateJWT(uid, name)

    res.json(
        {
            ok: true,
            uid: uid,
            name: name,
            token: token
        });
};