import { DataTypes } from "sequelize";
import db from "../db/connection";
import Usuario from "./usuario.model";
import Tarea from "./tarea.model";

const TareaEstudiante = db.define('Tarea_Estudiante', {
    entregada: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    archivo: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    tipoArchivo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Tarea_Estudiante',
    paranoid: true,
})

TareaEstudiante.belongsTo(Usuario, { as: 'estudiante', foreignKey: 'estudianteId' });
TareaEstudiante.belongsTo(Tarea, { as: 'tarea', foreignKey: 'tareaId' });

export default TareaEstudiante;