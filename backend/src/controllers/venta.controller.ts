import { Request, Response } from 'express';
import Venta from '../models/ventas.model';
import VentaDetalle from '../models/ventas_detalle.model';
import VentaEstado from '../models/ventas_estados.model';
import Producto from '../models/producto-producto.model';
import VentaPago from '../models/ventas_pago.model';
import ProductoPlantillaController from './producto-plantillas.controller';
const sequelize = require("sequelize");
const { Op } = require("sequelize");

export default class VentaController {
    private static _instance: VentaController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAll = async (req: Request, res: Response) => {
        const data = await Venta.findAll({
            include: ['cliente', 'usuario']
        });

        res.json(data);
    }

    /**
     * OBTENER TODO EL MODELO POR ESTADO
     */
    getAllByState = async (req: Request, res: Response) => {
        const { estado_venta } = req.params;

        const data = await Venta.findAll({
            include: ['cliente', 'usuario'],
            where: {
                estado_venta: estado_venta
            }
        });

        res.json(data);
    }

    /**
     * OBTENER TODO EL MODELO POR ESTADO
     */
    getAllByStateAndUser = async (req: Request, res: Response) => {
        const { estado_venta, usuarioId } = req.params;

        const data = await Venta.findAll({
            include: ['cliente', 'usuario'],
            where: {
                estado_venta: estado_venta,
                usuarioId: usuarioId
            }
        });

        res.json(data);
    }

    /**
     * OBTENER MODELO
     */
    getSingle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await Venta.findByPk(id, {
            include: ['usuario', 'cliente', 'importes', {
                as: 'detalle',
                model: VentaDetalle,
                include: [{
                    as: 'producto',
                    model: Producto,
                    include: ['plantilla']
                },],
            }]
        });

        if (data) {
            res.json(data);
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                error: 'Orden no encontrada.'
            })
        }
    }

    /**
     * REGISTRAR MODELO
     */
    create = async (req: Request, res: Response) => {
        const { body } = req;

        try {
            const venta: any = Venta.build(body);
            await venta.save();

            let estado_venta = {
                ventaId: venta.id,
                estado: venta.estado_venta
            }
            const venta_estado: any = VentaEstado.build(estado_venta);
            await venta_estado.save();

            // TODO: VALIDAR CANTIDAD DE PRODUCTOS EN BASE DE DATOS

            body.productos.forEach(async (producto: any) => {
                let detalle_venta = {
                    ventaId: venta.id,
                    productoId: producto.id,
                    precio: producto.precio,
                    cantidad: producto.cantidad,
                    subtotal: producto.subtotal,
                }
                
                const detalle: any = VentaDetalle.build(detalle_venta);
                await detalle.save();
            });

            return res.json(venta);
        } catch (error) {
            return res.status(500).json({
                ok: false,
                status: 500,
                data: 'Ha ocurrido un error. Contacte al desarrollador backend.',
                error: JSON.stringify(error)
            })
        }
    }

    /**
     * ACTUALIZAR MODELO
     */
    pagarVenta = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { body } = req;

        try {


            const data = await Venta.findByPk(id);
            if (data) {
                const venta_pago: any = VentaPago.build({
                    ventaId: id,
                    importe: body.importe,
                    tipo_pago: body.tipo_pago
                });
                await venta_pago.save();

                await data.update({
                    estado_pago: body.estado_pago
                });
                res.json(data);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    error: 'Venta no encontrada.'
                })
            }
        } catch (error: any) {
            res.status(500).json({
                ok: false,
                status: 500,
                data: 'Ha ocurrido un error. Contacte al desarrollador backend.',
                error: JSON.stringify(error)
            })
        }
    }

    /**
     * ACTUALIZAR MODELO
     */
    actualizarEstado = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { body } = req;

        try {
            const data: any = await Venta.findByPk(id, {
                include: ['usuario', 'cliente', 'importes', {
                    as: 'detalle',
                    model: VentaDetalle,
                    include: [{
                        as: 'producto',
                        model: Producto,
                        include: ['plantilla']
                    },],
                }]
            });

            if (data) {
                let estado_venta = {
                    ventaId: id,
                    estado: body.estado_venta
                }
                const venta_estado: any = VentaEstado.build(estado_venta);
                await venta_estado.save();

                await data.update({
                    estado_venta: body.estado_venta
                });

                if(body.estado_venta == 'ENTREGADO') {
                    data.detalle.forEach(async (producto: any) => {
                        await ProductoPlantillaController.getInstance().reducirInventario(producto.productoId, producto.cantidad);
                    });
                }
                res.json(data);
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    error: 'Venta no encontrada.'
                })
            }
        } catch (error: any) {
            res.status(500).json({
                ok: false,
                status: 500,
                data: 'Ha ocurrido un error. Contacte al desarrollador backend.',
                error: JSON.stringify(error)
            })
        }
    }

    actualizarEstadoPagado = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { body } = req;

        try {
            const data: any = await Venta.findByPk(id, {
                include: ['usuario', 'cliente', 'importes', {
                    as: 'detalle',
                    model: VentaDetalle,
                    include: [{
                        as: 'producto',
                        model: Producto,
                        include: ['plantilla']
                    },],
                }]
            });

            if(data) {
                let estado_venta = {
                    ventaId: id,
                    estado: body.estado_venta
                }
                const venta_estado: any = VentaEstado.build(estado_venta);
                await venta_estado.save();

                await data.update({
                    estado_venta: body.estado_venta
                });

                data.detalle.forEach(async (producto: any) => {
                    await ProductoPlantillaController.getInstance().reducirInventario(producto.productoId, producto.cantidad);
                });
                res.json(data)
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    error: 'Orden no encontrada.'
                })
            }


        } catch (error: any) {
            res.status(500).json({
                ok: false,
                status: 500,
                data: 'Ha ocurrido un error. Contacte al desarrollador backend.',
                error: JSON.stringify(error)
            })
        }
    }

    /**
     * OBTENER CANTIDAD DE VENTAS TOTALES
     */
    getAllTotal = async (req: Request, res: Response) => {
        const { fechaInicio, fechaFin } = req.params;

        console.log(fechaInicio)
        console.log(fechaFin)
        
        const obtenerTotal: any = await Venta.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('total')), 'total'],
            ],
            where: {
                createdAt: {
                    [Op.between]: [fechaInicio, fechaFin]
                },
                estado_venta: 'ENTREGADO'
            }
        });

        const vendedores = await Venta.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('total')), 'total'],
                'usuarioId'
            ],
            where: {
                createdAt: {
                    [Op.between]: [fechaInicio, fechaFin]
                },
                estado_venta: 'ENTREGADO'
            },
            include: ['usuario'],
            group: ['usuarioId'],
            order: [[sequelize.literal('total'), 'DESC']]
        });

        let dataJSON: any= {
            total: obtenerTotal[0].total ?? 0,
            vendedores: vendedores
        }

        res.json(dataJSON);
    }

    getAllVentasPorUsuario = async (req: Request, res: Response) => {
        const { body } = req;

        console.log(body)
        const data = await Venta.findAll({
            include: ['cliente', 'usuario'],
            where: {
                createdAt: {
                    [Op.between]: [body.fechaInicio, body.fechaFin]
                },
                estado_venta: 'ENTREGADO',
                usuarioId: body.usuarioId
            },
        });

        res.json(data);
    }

}