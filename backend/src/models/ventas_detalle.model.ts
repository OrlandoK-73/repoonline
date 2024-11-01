import { DataTypes } from "sequelize";
import db from "../db/connection";
import Venta from "./ventas.model";
import Producto from "./producto-producto.model";

const VentaDetalle = db.define('Ventas_Detalles', {
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
}, {
    tableName: 'Ventas_Detalles',
    paranoid: true,
})

VentaDetalle.belongsTo(Venta, { as: 'venta', foreignKey: 'ventaId' });
VentaDetalle.belongsTo(Producto, { as: 'producto', foreignKey: 'productoId' });
Venta.hasMany(VentaDetalle, { as: "detalle", foreignKey: 'ventaId' });

export default VentaDetalle;