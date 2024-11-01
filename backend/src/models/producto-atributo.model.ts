import { DataTypes } from "sequelize";
import db from "../db/connection";
import ProductoAtributoValor from "./producto-atributo-valor.model";

const ProductoAtributo = db.define('Productos_Atributos', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Productos_Atributos',
    paranoid: true,
})

ProductoAtributo.hasMany(ProductoAtributoValor, { as: 'valores', foreignKey: 'productoAtributoId' });
export default ProductoAtributo;