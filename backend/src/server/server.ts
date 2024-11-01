import express = require('express');
import path = require('path');
import db from '../db/connection';
import usuario from '../routes/usuarios.routes';
import grado from '../routes/grado.routes';
import seccion from '../routes/seccion.routes';
import curso from '../routes/curso.routes';
import asignacion_maestro from '../routes/asignacion_maestro.routes';
import asignacion_estudiante from '../routes/asignacion_estudiante.routes';
import asistencia from '../routes/asistencia.routes';
import tarea from '../routes/tarea.routes';
import pregunta from '../routes/pregunta.routes';
import tarea_estudiante from '../routes/tarea_estudiante.routes';

export default class Server {
    public app: express.Application;
    public port: number;
    private apiPath: string = '/api';

    constructor(port: number) {
        this.app = express();
        this.port = port;
        
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.logRegisteredRoutes();
    }
    middlewares() {
        this.app.use(express.json());  // Asegurarse de poder procesar JSON en las peticiones
        this.app.use(express.static(path.join(__dirname, 'public')));  // Si tienes archivos estáticos

        // CORS primero
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
            if (req.method === "OPTIONS") {
                return res.sendStatus(200);
            }
            next();
        });
    
        // Body Parser
        this.app.use(express.json({ limit: '100mb' }));
        this.app.use(express.urlencoded({ limit: '100mb', extended: true }));
    
        // Carpeta Pública
        this.publicFolder();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online... exito');
            console.log('Database connection info:', {
                name: db.config.database,
                host: db.config.host,
                port: db.config.port,
                dialect: db.getDialect()
            });
        
        } catch (error) {
            console.error('Error detallado de conexion', error);
            throw new Error(`Error de conexión a la base de datos: ${error}`);
            
        }
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

    routes() {
        //logging middleware
        this.app.use((req, res, next) => {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
            next();
        });

        // API Routes
        // Rutas con prefijos específicos para cada módulo
        this.app.use(`${this.apiPath}/usuarios`, usuario);
        this.app.use(`${this.apiPath}/grados`, grado);
        this.app.use(`${this.apiPath}/seccion`, seccion);
        this.app.use(`${this.apiPath}/curso`, curso);
        this.app.use(`${this.apiPath}/asignacion_maestro`, asignacion_maestro);
        this.app.use(`${this.apiPath}/asignacion_estudiante`, asignacion_estudiante);
        this.app.use(`${this.apiPath}/asistencia`, asistencia);
        this.app.use(`${this.apiPath}/tarea`, tarea);
        this.app.use(`${this.apiPath}/pregunta`, pregunta);
        this.app.use(`${this.apiPath}/tarea_estudiante`, tarea_estudiante);

        // Ruta principal
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API Online',
                endpoints: `${this.apiPath}/*`
            });
        });

        // Manejo de rutas no encontradas
        this.app.use('*', (req, res) => {
            res.status(404).json({
                msg: 'Route not found',
                path: req.originalUrl
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
            console.log(`API disponible en http://localhost:${this.port}${this.apiPath}`);
        });
    }
    private logRegisteredRoutes() {
        console.log('Rutas registradas:');
        this.app._router.stack.forEach((middleware: any) => {
            if (middleware.route) {
                console.log(`${Object.keys(middleware.route.methods)} ${middleware.route.path}`);
            } else if (middleware.name === 'router') {
                middleware.handle.stack.forEach((handler: any) => {
                    if (handler.route) {
                        const path = handler.route.path;
                        const methods = Object.keys(handler.route.methods);
                        console.log(`${methods} ${this.apiPath}${path}`);
                    }
                });
            }
        });
    }
}