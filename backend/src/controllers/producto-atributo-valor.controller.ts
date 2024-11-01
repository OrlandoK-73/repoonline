import { Request, Response } from 'express';
import ProductoAtributoValor from '../models/producto-atributo-valor.model';

export default class ProductoAtributoValorController {
    private static _instance: ProductoAtributoValorController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAll = async (req: Request, res: Response) => {
        const data = await ProductoAtributoValor.findAll();

        res.json(data);
    }

    /**
     * OBTENER MODELO
     */
    getSingle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await ProductoAtributoValor.findByPk(id);

        if (data) {
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Valor no encontrado.'
            })
        }
    }

    /**
     * REGISTRAR MODELO
     */
    create = async (req: Request, res: Response) => {
        const { body } = req;

        try {
            const data: any = ProductoAtributoValor.build(body);
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
            const data = await ProductoAtributoValor.findByPk(id);

            if (data) {
                await data.update(body);
                res.json(data);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    mensaje: 'Valor no encontrado.'
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

        const data = await ProductoAtributoValor.findByPk(id);
        if (data) {
            await data.destroy();
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Valor no encontrado.'
            });
        }
    }
}
