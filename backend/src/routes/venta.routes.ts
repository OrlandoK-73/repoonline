import { Router } from "express";
import VentaController from "../controllers/venta.controller";
const venta = Router();

venta.get('/venta', VentaController.getInstance().getAll);
venta.get('/venta/:id', VentaController.getInstance().getSingle);
venta.get('/venta/estado/:estado_venta', VentaController.getInstance().getAllByState);
venta.get('/venta/estado_usuario/:estado_venta/:usuarioId', VentaController.getInstance().getAllByStateAndUser);
venta.post('/venta', VentaController.getInstance().create);
venta.post('/pagar_venta/:id', VentaController.getInstance().pagarVenta);
venta.post('/cambiar_estado_venta/:id', VentaController.getInstance().actualizarEstado);
venta.post('/cambiar_estado_venta_pagado/:id', VentaController.getInstance().actualizarEstadoPagado);
venta.get('/obtener_total_ventas/:fechaInicio/:fechaFin', VentaController.getInstance().getAllTotal);
venta.post('/ventas/usuario', VentaController.getInstance().getAllVentasPorUsuario);

export default venta;