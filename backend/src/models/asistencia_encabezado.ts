import { DataTypes } from "sequelize";
import db from "../db/connection";
import AsignacionMaestro from "./asignacion_maestro.model";
import Usuario from "./usuario.model";

const AsistenciaEncabezado = db.define('', {
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bimestre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Asistencia_Encabezado',
    paranoid: true,
})

AsistenciaEncabezado.belongsTo(AsignacionMaestro, { as: 'asignacion_maestro', foreignKey: 'asignacionMaestroId' });

export default AsistenciaEncabezado;