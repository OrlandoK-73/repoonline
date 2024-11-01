import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carga las variables de entorno
const NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${NODE_ENV}` });

// Agregar logs para debug
console.log('Database Connection Config:', {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306
});

const db = new Sequelize(
    process.env.DB_DATABASE || '',
    process.env.DB_USERNAME || '',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        dialect: 'mysql',
        logging: console.log, // Activar logging temporalmente para debug
        dialectOptions: {
            typeCast: (field: any, next: any) => {
                if (field.type === 'DATETIME') {
                    return field.string();
                }
                return next();
            },
            connectTimeout: 60000 // Aumentar timeout de conexión
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 60000,
            idle: 10000
        },
        timezone: '-06:00',
        retry: {
            max: 5 // Intentar reconectar hasta 5 veces
        }
    }
);

// Agregar manejador de errores
db.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default db;