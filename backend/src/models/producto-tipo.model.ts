import { DataTypes } from "sequelize";
import db from "../db/connection";

const ProductoTipo = db.define('Productos_Tipos', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Productos_Tipos',
    paranoid: true,
})

export default ProductoTipo;