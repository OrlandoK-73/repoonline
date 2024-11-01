import { DataTypes } from "sequelize";
import db from "../db/connection";
import AsignacionMaestro from "./asignacion_maestro.model";
import Tarea from "./tarea.model";

const Pregunta = db.define('Preguntas', {
    tipo_pregunta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pregunta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    respuesta1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    respuesta2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    respuesta3: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    respuesta4: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    correcta: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    punteo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Preguntas',
    paranoid: true,
})

Pregunta.belongsTo(Tarea, { as: 'tarea', foreignKey: 'tareaId' });

export default Pregunta;