import { Request, Response } from 'express';
import Asistencia from '../models/asistencia.model';
import AsistenciaEncabezado from '../models/asistencia_encabezado';
import Usuario from '../models/usuario.model';

export default class AsistenciaController {
    private static _instance: AsistenciaController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAll = async (req: Request, res: Response) => {
        const data = await AsistenciaEncabezado.findAll();

        res.json(data);
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAllAsistenciasPorEstudiante = async (req: Request, res: Response) => {
        const { estudianteId, asignacionMaestroId } = req.params;

        console.log(estudianteId)
        console.log(asignacionMaestroId)

        const data = await AsistenciaEncabezado.findAll({
            include: [{
                model: Asistencia,
                as: 'asistencia',
                include: [{
                    model: Usuario,
                    as: 'estudiante',
                    where: {
                        id: estudianteId
                    }
                }]
            }],
            where: {
                asignacionMaestroId: asignacionMaestroId
            },
            order: [['fecha', 'DESC']] // Ordenar por fecha (de más antiguo a más reciente)
        });

        res.json(data);
    }

    /**
     * OBTENER MODELO
     */
    getSingle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await AsistenciaEncabezado.findAll({
            include: [{
                model: Asistencia,
                as: 'asistencia',
                include: ['estudiante']
            }],
            where: {
                asignacionMaestroId: id
            },
            limit: 5, // Limitar a los 5 primeros resultados
            order: [['fecha', 'DESC']] // Ordenar por fecha (de más antiguo a más reciente)
        });

        if (data) {
            res.json(data.reverse());
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Asistencia no encontrada.'
            })
        }
    }

    /**
     * REGISTRAR MODELO
     */
    create = async (req: Request, res: Response) => {
        const { body } = req;

        try {
            const encabezado: any =  AsistenciaEncabezado.build(body)
            await encabezado.save();

            body.asistencia.forEach(async (element:any) => {
                const asistencia: any = Asistencia.build({
                    estudianteId: element.estudianteId,
                    encabezadoId: encabezado.id,
                    asistio: element.asistio,
                    justificacion: element.justificacion
                });
                await asistencia.save();
            });
            res.json({mensaje: 'Asistencia agregada'});
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
            const data = await Asistencia.findByPk(id);

            if (data) {
                await data.update(body);
                res.json(data);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    mensaje: 'Asistencia no encontrada.'
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

        const data = await Asistencia.findByPk(id);
        if (data) {
            await data.destroy();
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Asistencia no encontrada.'
            });
        }
    }
}
