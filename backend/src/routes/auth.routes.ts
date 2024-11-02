import { Router } from "express";
import { validateLogin } from "../models/schema/userShema";
import { loginUsuario } from "../controllers/auth.controller";
import { validarJwt } from "../jwt/validarJwt";
import { revalidarToken } from "../jwt/revalidarToken";

const authRouter = Router();

authRouter.post('/', validateLogin, loginUsuario);
authRouter.get('/renew', validarJwt, revalidarToken);

export { authRouter };