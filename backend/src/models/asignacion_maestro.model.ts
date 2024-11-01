import { DataTypes } from "sequelize";
import db from "../db/connection";
import Usuario from "./usuario.model";
import Grado from "./grado.model";
import Seccion from "./seccion.model";
import Curso from "./curso.model";

const AsignacionMaestro = db.define('Asignacion_Maestro', {
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Asignacion_Maestro',
    paranoid: true,
})

AsignacionMaestro.belongsTo(Usuario, { as: 'maestro', foreignKey: 'maestroId' });
AsignacionMaestro.belongsTo(Grado, { as: 'grado', foreignKey: 'gradoId' });
AsignacionMaestro.belongsTo(Seccion, { as: 'seccion', foreignKey: 'seccionId' });
AsignacionMaestro.belongsTo(Curso, { as: 'curso', foreignKey: 'cursoId' });

export default AsignacionMaestro;