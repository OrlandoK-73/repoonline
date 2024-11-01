import { Request, Response } from 'express';
import ProductoPlantillaAtributo from '../models/producto-plantilla-atributo.model';

export default class ProductoPlantillaAtributoController {
    private static _instance: ProductoPlantillaAtributoController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAll = async (req: Request, res: Response) => {
        const data = await ProductoPlantillaAtributo.findAll();

        res.json(data);
    }

    /**
     * OBTENER MODELO
     */
    getSingle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await ProductoPlantillaAtributo.findByPk(id);

        if (data) {
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Producto Atributo no encontrado.'
            })
        }
    }

    /**
     * REGISTRAR MODELO
     */
    create = async (req: Request, res: Response) => {
        const { body } = req;

        try {
            const data: any = ProductoPlantillaAtributo.build(body);
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
            const data = await ProductoPlantillaAtributo.findByPk(id);

            if (data) {
                await data.update(body);
                res.json(data);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    mensaje: 'Producto Atributo no encontrado.'
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

        const data = await ProductoPlantillaAtributo.findByPk(id);
        if (data) {
            await data.destroy();
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Producto Atributo no encontrado.'
            });
        }
    }
}
