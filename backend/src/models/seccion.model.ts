import { DataTypes } from "sequelize";
import db from "../db/connection";

const Seccion = db.define('Secciones', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Secciones',
    paranoid: true,
})

export default Seccion;