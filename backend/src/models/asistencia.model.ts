import { DataTypes } from "sequelize";
import db from "../db/connection";
import Usuario from "./usuario.model";
import AsistenciaEncabezado from "./asistencia_encabezado";

const Asistencia = db.define('Asistencias', {
    asistio: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    justificacion: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    tableName: 'Asistencias',
    paranoid: true,
})

Asistencia.belongsTo(AsistenciaEncabezado, { as: 'encabezado', foreignKey: 'encabezadoId' });
Asistencia.belongsTo(Usuario, { as: 'estudiante', foreignKey: 'estudianteId' });
AsistenciaEncabezado.hasMany(Asistencia, { as: "asistencia", foreignKey: 'encabezadoId' });

export default Asistencia;