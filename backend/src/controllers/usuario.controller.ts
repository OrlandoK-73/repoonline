import { Request, Response } from 'express';
import { Model, Optional } from 'sequelize';
import Usuario from '../models/usuario.model';
import bcrypt from 'bcrypt';

interface UsuarioAttributes {
    id: number;
    email: string;
    password: string;
    [key: string]: any;
}

type UsuarioInstance = Model<UsuarioAttributes, Optional<UsuarioAttributes, 'id'>>;

export default class UsuarioController {
    private static _instance: UsuarioController;

    private constructor() {}

    public static getInstance(): UsuarioController {
        return this._instance || (this._instance = new this());
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            this.handleError(error, res, 'Error al obtener los usuarios');
        }
    };

    getSingle = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const usuario = await Usuario.findByPk<UsuarioInstance>(id);
            if (usuario) {
                res.json(usuario);
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        } catch (error) {
            this.handleError(error, res, 'Error al obtener el usuario');
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const { body } = req;
        try {
            const existeEmail = await Usuario.findOne({ where: { email: body.email } });
            if (existeEmail) {
                res.status(400).json({
                    error: `Ya existe un usuario con el email: ${body.email}`,
                });
                return;
            }
    
            const hashedPassword = bcrypt.hashSync(body.password, 10);
            console.log(`[CREATE USER] Original password: ${body.password}`);
            console.log(`[CREATE USER] Hashed password: ${hashedPassword}`);
            body.password = hashedPassword;
            const nuevoUsuario = await Usuario.create(body);
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            this.handleError(error, res, 'Error al crear el usuario');
        }
    };
    

    update = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { body } = req;
        try {
            const usuario = await Usuario.findByPk<UsuarioInstance>(id);
            if (!usuario) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }

            await usuario.update(body);
            res.json(usuario);
        } catch (error) {
            this.handleError(error, res, 'Error al actualizar el usuario');
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const usuario = await Usuario.findByPk<UsuarioInstance>(id);
            if (!usuario) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }

            await usuario.destroy();
            res.json({ message: 'Usuario eliminado', usuario });
        } catch (error) {
            this.handleError(error, res, 'Error al eliminar el usuario');
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        try {
            console.log(`[LOGIN] Attempting login for email: ${email}`);
            
            const usuario = await Usuario.findOne<UsuarioInstance>({ where: { email } });
            
            if (!usuario) {
                console.log(`[LOGIN] Usuario no encontrado para el email: ${email}`);
                res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
                return;
            }
            
            console.log(`[LOGIN] Usuario encontrado, verificando contraseña...`);
            const passwordMatch = bcrypt.compareSync(password, usuario.getDataValue('password'));
            console.log(`[LOGIN] Password match result: ${passwordMatch}`);
            
            if (passwordMatch) {
                const usuarioData = { ...usuario.toJSON(), password: undefined };
                console.log(`[LOGIN] Autenticación exitosa para el usuario: ${email}`);
                res.json(usuarioData);
            } else {
                console.log(`[LOGIN] Contraseña incorrecta para el usuario: ${email}`);
                res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
            }
        } catch (error) {
            console.error(`[LOGIN] Error en el inicio de sesión:`, error);
            this.handleError(error, res, 'Error en el inicio de sesión');
        }
    };
    
    

    private handleError(error: unknown, res: Response, message: string): void {
        console.error(message, error);
        res.status(500).json({
            error: message,
            details: error instanceof Error ? error.message : 'Error desconocido',
        });
    }
}
