import { Request, Response } from 'express';
import ProductoCategoria from '../models/producto-categoria.model';

export default class ProductoCategoriaController {
    private static _instance: ProductoCategoriaController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAll = async (req: Request, res: Response) => {
        const data = await ProductoCategoria.findAll({
            include: ['categorias'],
            where: {
                categoriaId: null
            }
        });

        res.json(data);
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAllCategorias = async (req: Request, res: Response) => {
        const data = await ProductoCategoria.findAll({
            include: ['categorias']
        });

        res.json(data);
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAllByCategoria = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await ProductoCategoria.findAll({
            where: {
                categoriaId: id
            }
        });

        res.json(data);
    }

    /**
     * OBTENER MODELO
     */
    getSingle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await ProductoCategoria.findByPk(id, {
        });

        if (data) {
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Categoria no encontrada.'
            })
        }
    }

    /**
     * REGISTRAR MODELO
     */
    create = async (req: Request, res: Response) => {
        const { body } = req;

        try {
            const data: any = ProductoCategoria.build(body);
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
            const data = await ProductoCategoria.findByPk(id);
            
            if (data) {
                await data.update({
                    nombre: body.nombre,
                    descripcion: body.descripcion,
                    img: body.img,
                });
                res.json(data);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    mensaje: 'Categoria no encontrada.'
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

        const data = await ProductoCategoria.findByPk(id);
        if (data) {
            await data.destroy();
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Categoria no encontrada.'
            });
        }
    }
}
