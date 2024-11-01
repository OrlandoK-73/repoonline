import { DataTypes } from "sequelize";
import db from "../db/connection";
import Venta from "./ventas.model";

const VentaEstado = db.define('Ventas_Estados', {
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Ventas_Estados',
    paranoid: true,
});

VentaEstado.belongsTo(Venta, { as: 'venta', foreignKey: 'ventaId' });

export default VentaEstado;