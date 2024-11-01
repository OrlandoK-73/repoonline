import { Request, Response } from 'express';
import Grado from '../models/grado.model';

export default class GradoController {
    private static _instance: GradoController;

    private constructor() {}

    public static getInstance(): GradoController {
        return this._instance || (this._instance = new this());
    }

    /**
     * Obtener todos los grados
     */
    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await Grado.findAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({
                ok: false,
                status: 500,
                mensaje: 'Error al obtener los grados.',
                error: JSON.stringify(error)
            });
        }
    };

    /**
     * Obtener un grado por ID
     */
    getSingle = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const data = await Grado.findByPk(id);
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    mensaje: 'Grado no encontrado.'
                });
            }
        } catch (error) {
            res.status(500).json({
                ok: false,
                status: 500,
                mensaje: 'Error al obtener el grado.',
                error: JSON.stringify(error)
            });
        }
    };

    /**
     * Crear un nuevo grado
     */
    create = async (req: Request, res: Response): Promise<void> => {
        const { body } = req;
        try {
            const data = Grado.build(body);
            await data.save();
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({
                ok: false,
                status: 500,
                mensaje: 'Error al crear el grado.',
                error: JSON.stringify(error)
            });
        }
    };

    /**
     * Actualizar un grado existente
     */
    update = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { body } = req;
        try {
            const data = await Grado.findByPk(id);
            if (data) {
                await data.update(body);
                res.json(data);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    mensaje: 'Grado no encontrado.'
                });
            }
        } catch (error) {
            res.status(500).json({
                ok: false,
                status: 500,
                mensaje: 'Error al actualizar el grado.',
                error: JSON.stringify(error)
            });
        }
    };

    /**
     * Eliminar un grado
     */
    delete = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const data = await Grado.findByPk(id);
            if (data) {
                await data.destroy();
                res.json({ mensaje: 'Grado eliminado correctamente.' });
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    mensaje: 'Grado no encontrado.'
                });
            }
        } catch (error) {
            res.status(500).json({
                ok: false,
                status: 500,
                mensaje: 'Error al eliminar el grado.',
                error: JSON.stringify(error)
            });
        }
    };
}
