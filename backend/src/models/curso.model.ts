import { DataTypes } from "sequelize";
import db from "../db/connection";

const Curso = db.define('Cursos', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Cursos',
    paranoid: true,
})



export default Curso;