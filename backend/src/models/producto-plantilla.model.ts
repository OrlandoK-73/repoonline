import { DataTypes } from "sequelize";
import db from "../db/connection";
import ProductoTipo from "./producto-tipo.model";
import ProductoCategoria from "./producto-categoria.model";
import Empresa from "./grado.model";

const ProductoPlantilla = db.define('Productos_Plantilla', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    puedeSerVendido: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    puedeSerComprado: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    precio: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Productos_Plantilla',
    paranoid: true,
})

ProductoPlantilla.belongsTo(ProductoTipo, { as: 'tipo', foreignKey: 'productoTipoId' });
ProductoPlantilla.belongsTo(ProductoCategoria, { as: 'categoria', foreignKey: 'productoCategoriaId' });
ProductoPlantilla.belongsTo(Empresa, { as: 'empresa', foreignKey: 'empresaId' });

export default ProductoPlantilla;