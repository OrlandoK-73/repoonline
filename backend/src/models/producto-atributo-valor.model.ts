import { DataTypes } from "sequelize";
import db from "../db/connection";

const ProductoAtributoValor = db.define('Productos_Atributos_Valores', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio_adicional: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    }
}, {
    tableName: 'Productos_Atributos_Valores',
    paranoid: true,
})

export default ProductoAtributoValor;