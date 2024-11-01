import Server from "./server/server";
import * as dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV || 'development';

// Configuración del entorno
dotenv.config({
    path: `.env.${NODE_ENV}`
});

// Configuración del servidor
const port = parseInt(process.env.PORT as string, 10) || 3000;
const server = new Server(port);

// Logging para debug
console.log(`Environment: ${NODE_ENV}`);
console.log(`Port: ${port}`);

// Levantar servidor
server.listen();