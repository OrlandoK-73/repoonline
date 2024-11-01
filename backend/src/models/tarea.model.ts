import { DataTypes } from "sequelize";
import db from "../db/connection";
import AsignacionMaestro from "./asignacion_maestro.model";

const Tarea = db.define('Tareas', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaLimite: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_tarea: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bimestre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Tareas',
    paranoid: true,
})

Tarea.belongsTo(AsignacionMaestro, { as: 'asignacion_maestro', foreignKey: 'asignacionMaestroId' });

export default Tarea;