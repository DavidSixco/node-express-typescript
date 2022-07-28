import { Request, Response } from 'express';
import userModel from '../models/userModel';
import bcrypt from 'bcrypt';
import { generateJWT } from '../config/jwt';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const usuario = await userModel.findOne({ email });

        if (!usuario) {
            console.log('error user');
            return res.status(400).json({ ok: false, msj: `No existe usurio con el correo:  ${email}` });
        }

        const validatePassword = bcrypt.compareSync(password, usuario.password);
        if (!validatePassword) {
            return res.status(400).json({ ok: false, msj: `Contrasena incorrecta` });
        }

        const token = await generateJWT(usuario.id, usuario.name);

        return res.status(201).json({
            ok: true,
            msj: 'Sesion iniciada exitosamente',
            data: {
                uid: usuario.id,
                token
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: 'false',
            msj: error.message
        })
    }
};

/**
 * 
 * @param { request } req request of the end point
 * @param { response } res response of the method
 */
export const createNewUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        let usuario = await userModel.findOne({ email });
        if (usuario) {
            return res.status(400).json({ ok: false, msj: `Ya existe un usuario con el correo ${email}` })
        }
        usuario = new userModel(req.body);
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save();

        const token = await generateJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            msj: 'Usuario creado exitosamente',
            data: {
                uid: usuario.id,
                token,
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            ok: false,
            msj: error?.message
        })
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const { uid, name } = req.IUser;
    const token = await generateJWT(uid, name);
    return res.json({
        ok: true,
        message: 'Refresh token is success',
        data: token,
    });
};

