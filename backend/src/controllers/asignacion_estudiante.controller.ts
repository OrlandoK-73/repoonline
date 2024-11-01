import { Request, Response } from 'express';
import AsignacionEstudiante from '../models/asignacion_estudiante.model';

export default class AsignacionEstudianteController {
    private static _instance: AsignacionEstudianteController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAll = async (req: Request, res: Response) => {
        const data = await AsignacionEstudiante.findAll({
            include: ['estudiante', 'grado', 'seccion']
        });

        res.json(data);
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAllEstudiantes = async (req: Request, res: Response) => {
        const { gradoId, seccionId, anio } = req.params;
        console.log(gradoId)
        console.log(seccionId)
        console.log(anio)
        const data = await AsignacionEstudiante.findAll({
            include: ['estudiante', 'grado', 'seccion'],
            where: {
                gradoId: gradoId,
                seccionId: seccionId,
                anio: anio,
            }
        });

        res.json(data);
    }

    /**
     * OBTENER MODELO
     */
    getSingle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await AsignacionEstudiante.findByPk(id);

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
            const data: any = AsignacionEstudiante.build(body);
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
            const data = await AsignacionEstudiante.findByPk(id);

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

        const data = await AsignacionEstudiante.findByPk(id);
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
