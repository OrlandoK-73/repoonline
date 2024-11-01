import { Request, Response } from 'express';
import AsignacionMaestro from '../models/asignacion_maestro.model';

export default class AsignacionMaestroController {
    private static _instance: AsignacionMaestroController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAll = async (req: Request, res: Response) => {
        const data = await AsignacionMaestro.findAll({
            include: ['maestro', 'grado', 'seccion', 'curso']
        });

        res.json(data);
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAllPorMaestro = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await AsignacionMaestro.findAll({
            include: ['maestro', 'grado', 'seccion', 'curso'],
            where: {
                maestroId: id
            }
        });

        res.json(data);
    }

    /**
     * OBTENER MODELO
     */
    getSingle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await AsignacionMaestro.findByPk(id, {
            include: ['maestro', 'grado', 'seccion', 'curso'],
        });

        if (data) {
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Asignación no encontrada.'
            })
        }
    }

    /**
     * REGISTRAR MODELO
     */
    create = async (req: Request, res: Response) => {
        const { body } = req;

        try {
            const data: any = AsignacionMaestro.build(body);
            await data.save();
            res.json(data);
        } catch (error) {
            res.status(500).json({
                ok: false,
                status: 500,
                mensaje: 'Ha ocurrido un error. Contacte al desarrollador backend.',
                error: JSON.stringify(error)
            })
        }
    }

    /**
     * ACTUALIZAR MODELO
     */
    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { body } = req;

        try {
            const data = await AsignacionMaestro.findByPk(id);

            if (data) {
                await data.update(body);
                res.json(data);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    mensaje: 'Asignación no encontrada.'
                })
            }
        } catch (error) {
            res.status(500).json({
                ok: false,
                status: 500,
                mensaje: 'Ha ocurrido un error. Contacte al desarrollador backend.',
                error: JSON.stringify(error)
            })
        }
    }

    /**
     * ELIMINAR MODELO
     */
    delete = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await AsignacionMaestro.findByPk(id);
        if (data) {
            await data.destroy();
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Asignación no encontrada.'
            });
        }
    }
}
