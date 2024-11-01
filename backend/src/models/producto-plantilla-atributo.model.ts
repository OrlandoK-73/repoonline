import { DataTypes } from "sequelize";
import db from "../db/connection";
import ProductoPlantilla from "./producto-plantilla.model";
import ProductoAtributo from "./producto-atributo.model";

const ProductoPlantillaAtributo = db.define('Productos_Plantilla_Atributos', {
}, {
    tableName: 'Productos_Plantilla_Atributos',
    paranoid: true,
})

ProductoPlantillaAtributo.belongsTo(ProductoPlantilla, { as: 'plantilla', foreignKey: 'productoPlantillaId' });
ProductoPlantillaAtributo.belongsTo(ProductoAtributo, { as: 'atributo', foreignKey: 'productoAtributoId' });

export default ProductoPlantillaAtributo;