import { DataTypes } from "sequelize";
import db from "../db/connection";
import Venta from "./ventas.model";

const VentaPago = db.define('Ventas_Pago', {
    tipo_pago: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    importe: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
}, {
    tableName: 'Ventas_Pago',
    paranoid: true,
});

VentaPago.belongsTo(Venta, { as: 'venta', foreignKey: 'ventaId' });
Venta.hasMany(VentaPago, { as: "importes", foreignKey: 'ventaId' });

export default VentaPago;