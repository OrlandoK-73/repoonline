import { Request, Response } from 'express';
import Tarea from '../models/tarea.model';
import AsignacionMaestro from '../models/asignacion_maestro.model';

export default class TareaController {
    private static _instance: TareaController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAll = async (req: Request, res: Response) => {
        const data = await Tarea.findAll();

        res.json(data);
    }

    /**
     * OBTENER MODELO
     */
    getSingle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await Tarea.findByPk(id, {
            include: [{
                model: AsignacionMaestro,
                as: 'asignacion_maestro',
                include: ['curso']
            }]
        });

        if (data) {
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Tarea no encontrada.'
            })
        }
    }

    /**
     * OBTENER MODELO
     */
    getTareasPorAsignacion = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await Tarea.findAll({
            where: {
                asignacionMaestroId: id
            }
        });

        if (data) {
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Tarea no encontrada.'
            })
        }
    }

    /**
     * OBTENER MODELO
     */
    getTareasPorAsignacionYEstudiante = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await Tarea.findAll({
            where: {
                asignacionMaestroId: id
            }
        });

        if (data) {
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Tarea no encontrada.'
            })
        }
    }

    /**
     * REGISTRAR MODELO
     */
    create = async (req: Request, res: Response) => {
        const { body } = req;

        console.log(body)

        try {
            const data: any = Tarea.build(body);
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

        console.log(body)
        try {
            const data = await Tarea.findByPk(id);

            if (data) {
                await data.update(body);
                res.json(data);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    mensaje: 'Tarea no encontrada.'
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

        const data = await Tarea.findByPk(id);
        if (data) {
            await data.destroy();
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Tarea no encontrada.'
            });
        }
    }
}
