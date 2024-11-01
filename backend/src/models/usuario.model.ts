import { DataTypes } from "sequelize";
import db from "../db/connection";
import Asistencia from "./asistencia.model";

const Usuario = db.define('Usuarios', {
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Usuarios',
    paranoid: true,
});

export default Usuario;