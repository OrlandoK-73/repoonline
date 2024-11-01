import { Request, Response } from 'express';
import AsignacionMaestro from '../models/asignacion_maestro.model';
import TareaEstudiante from '../models/tarea_estudiante.model';
import db from '../db/connection';
import { QueryTypes } from 'sequelize';

export default class TareaEstudianteEstudianteController {
    private static _instance: TareaEstudianteEstudianteController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAll = async (req: Request, res: Response) => {
        const data = await TareaEstudiante.findAll();

        res.json(data);
    }

    /**
     * OBTENER MODELO
     */
    getSingle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await TareaEstudiante.findByPk(id, {
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
                mensaje: 'TareaEstudiante no encontrada.'
            })
        }
    }

    /**
     * OBTENER MODELO
     */
    getNotasTareasPorEstudiante = async (req: Request, res: Response) => {
        const { estudianteId, asignacionMaestroId } = req.params;

        let query = `
            SELECT 
                t.nombre,
                te.tareaId,
                t.tipo_tarea,
                t.bimestre,
                te.nota,
                te.estudianteId,
                te.createdAt AS realizado
            FROM auladigital.tareas t
            INNER JOIN auladigital.tarea_estudiante te ON te.tareaId = t.id
            WHERE asignacionMaestroId = 1
            AND estudianteId = 3
            UNION
            SELECT
                t.nombre,
                t.id AS tareaId,
                t.tipo_tarea,
                t.bimestre,
                0 AS nota,
                NULL as estudianteId,
                NULL AS realizado
            FROM auladigital.tareas t
            WHERE t.asignacionMaestroId = 1
            AND t.id NOT IN (SELECT 
                t.id
            FROM auladigital.tareas t
            INNER JOIN auladigital.tarea_estudiante te ON te.tareaId = t.id
            WHERE asignacionMaestroId = 1
            AND estudianteId = 3)
        `;

        const data = await db.query(query, {
            replacements: {
                estudianteId: estudianteId,
                asignacionMaestroId: asignacionMaestroId,
            },
            type: QueryTypes.SELECT
        })

        res.json(data);
    }

    /**
     * OBTENER MODELO
     */
    getNotasPorEstudiante = async (req: Request, res: Response) => {
        const { estudianteId, asignacionMaestroId } = req.params;

        let query = `
            SELECT 
                te.estudianteId,
                c.nombre,
                SUM(CASE WHEN t.bimestre = 'PRIMER' THEN te.nota ELSE 0 END) AS primer,
                SUM(CASE WHEN t.bimestre = 'SEGUNDO' THEN te.nota ELSE 0 END) AS segundo,
                SUM(CASE WHEN t.bimestre = 'TERCER' THEN te.nota ELSE 0 END) AS tercer,
                SUM(CASE WHEN t.bimestre = 'CUARTO' THEN te.nota ELSE 0 END) AS cuarto,
                SUM(CASE WHEN t.bimestre = 'QUINTO' THEN te.nota ELSE 0 END) AS quinto,
                (
                    SUM(CASE WHEN t.bimestre = 'PRIMER' THEN te.nota ELSE 0 END) +
                    SUM(CASE WHEN t.bimestre = 'SEGUNDO' THEN te.nota ELSE 0 END) +
                    SUM(CASE WHEN t.bimestre = 'TERCER' THEN te.nota ELSE 0 END) +
                    SUM(CASE WHEN t.bimestre = 'CUARTO' THEN te.nota ELSE 0 END) +
                    SUM(CASE WHEN t.bimestre = 'QUINTO' THEN te.nota ELSE 0 END)
                ) / 5 AS promedio
            FROM auladigital.tareas t
            INNER JOIN auladigital.tarea_estudiante te ON te.tareaId = t.id
            INNER JOIN asignacion_maestro am ON am.id = t.asignacionMaestroId
            INNER JOIN cursos c ON c.id = am.cursoId
            WHERE estudianteId = :estudianteId
            GROUP BY te.estudianteId, c.nombre
        `;

        const data = await db.query(query, {
            replacements: {
                estudianteId: estudianteId,
            },
            type: QueryTypes.SELECT
        })

        res.json(data);
    }

    /**
     * REGISTRAR MODELO
     */
    create = async (req: Request, res: Response) => {
        const { body } = req;

        try {
            const data: any = TareaEstudiante.build(body);
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
            const data = await TareaEstudiante.findByPk(id);

            if (data) {
                await data.update(body);
                res.json(data);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    mensaje: 'TareaEstudiante no encontrada.'
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

        const data = await TareaEstudiante.findByPk(id);
        if (data) {
            await data.destroy();
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'TareaEstudiante no encontrada.'
            });
        }
    }
}
