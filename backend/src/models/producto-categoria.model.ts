import { DataTypes } from "sequelize";
import db from "../db/connection";

const ProductoCategoria = db.define('Productos_Categorias', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Productos_Categorias',
    paranoid: true,
})

ProductoCategoria.hasMany(ProductoCategoria, { as: 'categorias', foreignKey: 'categoriaId' });
ProductoCategoria.belongsTo(ProductoCategoria, { as: 'marca', foreignKey: 'categoriaId' });

export default ProductoCategoria;