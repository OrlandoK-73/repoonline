import { Request, Response } from 'express';
import Pregunta from '../models/pregunta.model';

export default class PreguntaController {
    private static _instance: PreguntaController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAll = async (req: Request, res: Response) => {
        const data = await Pregunta.findAll();

        res.json(data);
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAllPorTarea = async (req: Request, res: Response) => {
        const { id } = req.params;
        
        const data = await Pregunta.findAll({
            where: {
                tareaId: id
            }
        });

        res.json(data);
    }

    /**
     * OBTENER MODELO
     */
    getSingle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await Pregunta.findByPk(id);

        if (data) {
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Pregunta no encontrada.'
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
            const data: any = Pregunta.build(body);
            await data.save();
            res.json(data);
        } catch (error) {
            console.log(error)
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
            const data = await Pregunta.findByPk(id);

            if (data) {
                await data.update(body);
                res.json(data);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    mensaje: 'Pregunta no encontrada.'
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

        const data = await Pregunta.findByPk(id);
        if (data) {
            await data.destroy();
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Pregunta no encontrada.'
            });
        }
    }
}
