import { DataTypes } from "sequelize";
import db from "../db/connection";
import ProductoPlantilla from "./producto-plantilla.model";

const Producto = db.define('Productos_Productos', {
    combinacion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    inventario: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
}, {
    tableName: 'Productos_Productos',
    paranoid: true,
})

Producto.belongsTo(ProductoPlantilla, { as: 'plantilla', foreignKey: 'productoPlantillaId' });

export default Producto;