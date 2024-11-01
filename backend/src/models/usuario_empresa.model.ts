import { DataTypes } from "sequelize";
import db from "../db/connection";
import Empresa from "./grado.model";
import Usuario from "./usuario.model";

const UsuarioEmpresa = db.define('Usuarios_Empresas', {
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
          model: Usuario,
          key: 'id'
        }
    },
    empresaId: {
        type: DataTypes.INTEGER,
        references: {
          model: Empresa,
          key: 'id'
        }
    }
}, {
    tableName: 'Usuarios_Empresas',
    paranoid: true,
});

export default UsuarioEmpresa;