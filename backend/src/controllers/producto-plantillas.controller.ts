import { Request, Response } from 'express';
import ProductoPlantilla from '../models/producto-plantilla.model';
import Producto from '../models/producto-producto.model';
import ProductoCategoria from '../models/producto-categoria.model';
import { Op } from 'sequelize';

export default class ProductoPlantillaController {
    private static _instance: ProductoPlantillaController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAll = async (req: Request, res: Response) => {
        const data = await Producto.findAll({
            where: {
                inventario: {
                    [Op.ne]: 0,
                }
            },
            include: [{
                model: ProductoPlantilla,
                as: 'plantilla',
                include: ['tipo', 'empresa', {
                    model: ProductoCategoria,
                    as: 'categoria',
                    include: ['marca']
                }]
              },
            ],
        })

        let productos = await data.map((producto:any) => {
            return {
                productoPlantillaId: producto.plantilla.dataValues.id,
                id: producto.id,
                inventario: producto.inventario,
                combinacion: producto.combinacion,
                ...producto.plantilla.dataValues,
            }
        });

        res.json(productos);
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAllByEmpresa = async (req: Request, res: Response) => {
        const { ids } = req.params;

        const data = await Producto.findAll({
            include: [{
                model: ProductoPlantilla,
                as: 'plantilla',
                include: ['tipo', 'empresa', {
                    model: ProductoCategoria,
                    as: 'categoria',
                    include: ['marca']
                }],
                where: {
                    empresaId: {
                        [Op.in]: ids.split(','), 
                    }
                }
              },
            ],
        })

        let productos = await data.map((producto:any) => {
            return {
                productoPlantillaId: producto.plantilla.dataValues.id,
                id: producto.id,
                inventario: producto.inventario,
                combinacion: producto.combinacion,
                ...producto.plantilla.dataValues,
            }
        });

        res.json(productos);
    }


    /**
     * OBTENER MODELO
     */
    getByCategoria = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await Producto.findAll({
            where: {
                inventario: {
                    [Op.ne]: 0,
                }
            },
            include: [{
                model: ProductoPlantilla,
                as: 'plantilla',
                include: ['tipo', 'empresa', {
                    model: ProductoCategoria,
                    as: 'categoria',
                    include: ['marca']
                }],
                where: {
                    productoCategoriaId: id
                }
              },
            ],
        })

        let productos = await data.map((producto:any) => {
            return {
                productoPlantillaId: producto.plantilla.dataValues.id,
                id: producto.id,
                combinacion: producto.combinacion,
                inventario: producto.inventario,
                ...producto.plantilla.dataValues,
            }
        });

        res.json(productos);
    }

    /**
     * REGISTRAR MODELO
     */
    create = async (req: Request, res: Response) => {
        const { body } = req;

        try {
            const producto_plantilla: any = ProductoPlantilla.build(body);
            await producto_plantilla.save();

            const producto: any = Producto.build({
                productoPlantillaId: producto_plantilla.id,
                inventario: body.inventario
            });
            await producto.save();

            res.json(producto_plantilla);
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
        const { body } = req;

        try {
            const dataPlantilla = await ProductoPlantilla.findByPk(body.productoPlantillaId);

            if (dataPlantilla) {
                await dataPlantilla.update({
                    nombre: body.nombre,
                    descripcion: body.descripcion,
                    img: body.img,
                    puedeSerVendido: body.puedeSerVendido,
                    puedeSerComprado: body.puedeSerComprado,
                    precio: body.precio,
                    productoTipoId: body.productoTipoId,
                    productoCategoriaId: body.productoCategoriaId,
                    empresaId: body.empresaId,
                    barcode: body.barcode,
                });

                const producto = await Producto.findByPk(body.id);
                if (producto) {
                    await producto.update({
                        inventario: body.inventario
                    });    
                }
                res.json(dataPlantilla);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    mensaje: 'Producto no encontrado.'
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

        const data = await Producto.findByPk(id);
        if (data) {
            await data.destroy();
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Producto no encontrado.'
            });
        }
    }

    reducirInventario = async (id: number, cantidad: number) => {
        const data:any = await Producto.findOne({
            where: {
                id: id,
            }
        });

        if (data) {
            // REDUCIR DE INVENTARIO
            await data.update({
                inventario: Number(data.cantidad) - Number(cantidad)
            });
        } 
    }

    /**
     * OBTENER PRODUCTO POR BARCODE
     */
    getByBarcode = async (req: Request, res: Response) => {
        const { barcode } = req.params;

        const data = await Producto.findAll({
            include: [{
                model: ProductoPlantilla,
                as: 'plantilla',
                where: {
                    barcode: barcode
                },
                include: ['tipo', 'empresa', {
                    model: ProductoCategoria,
                    as: 'categoria',
                    include: ['marca']
                }]
              },
            ],
        })

        let productos = await data.map((producto:any) => {
            return {
                productoPlantillaId: producto.plantilla.dataValues.id,
                id: producto.id,
                inventario: producto.inventario,
                combinacion: producto.combinacion,
                ...producto.plantilla.dataValues,
            }
        });

        if (productos[0]) {
            res.json(productos[0]);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Producto no encontrado por código de barra.'
            })
        }
    }

}
