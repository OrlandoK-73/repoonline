import { DataTypes } from "sequelize";
import db from "../db/connection";
import Cliente from "./cliente.model";
import Usuario from "./usuario.model";

const Venta = db.define('Ventas', {
    estado_venta: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    estado_pago: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Ventas',
    paranoid: true,
})

Venta.belongsTo(Cliente, { as: 'cliente', foreignKey: 'clienteId' });
Venta.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuarioId' });

export default Venta;