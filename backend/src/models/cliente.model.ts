import { DataTypes } from "sequelize";
import db from "../db/connection";

const Cliente = db.define('Clientes', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nit: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Clientes',
    paranoid: true,
})

export default Cliente;