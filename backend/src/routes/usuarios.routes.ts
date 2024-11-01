import { Router } from 'express';
import UsuarioController from '../controllers/usuario.controller';

const router = Router();
const usuarioController = UsuarioController.getInstance();

// Middleware para registrar las rutas accedidas
router.use('/', (req, res, next) => {
    console.log(`[Usuario Route] ${req.method} ${req.originalUrl}`);
    next();
});

// Rutas para el controlador de usuarios
router.get('/', (req, res) => usuarioController.getAll(req, res));
router.get('/:id', (req, res) => usuarioController.getSingle(req, res));
router.post('/', (req, res) => usuarioController.create(req, res));
router.put('/:id', (req, res) => usuarioController.update(req, res));
router.delete('/:id', (req, res) => usuarioController.delete(req, res));
router.post('/login', (req, res) => usuarioController.login(req, res));

export default router;
