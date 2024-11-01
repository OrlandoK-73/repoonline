import { DataTypes } from "sequelize";
import db from "../db/connection";

const Grado = db.define('Grados', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Grados',
    paranoid: true,
})

export default Grado;