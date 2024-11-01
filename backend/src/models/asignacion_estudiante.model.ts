import { DataTypes } from "sequelize";
import db from "../db/connection";
import Usuario from "./usuario.model";
import Grado from "./grado.model";
import Seccion from "./seccion.model";

const AsignacionEstudiante = db.define('Asignacion_Estudiante', {
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Asignacion_Estudiante',
    paranoid: true,
})

AsignacionEstudiante.belongsTo(Usuario, { as: 'estudiante', foreignKey: 'estudianteId' });
AsignacionEstudiante.belongsTo(Grado, { as: 'grado', foreignKey: 'gradoId' });
AsignacionEstudiante.belongsTo(Seccion, { as: 'seccion', foreignKey: 'seccionId' });

export default AsignacionEstudiante;