import { Router } from "express";
import ProductoCategoriaController from "../controllers/producto-categoria.controller";
const producto_categoria = Router();

producto_categoria.get('/producto_categoria', ProductoCategoriaController.getInstance().getAll);
producto_categoria.get('/producto_categoria_all', ProductoCategoriaController.getInstance().getAllCategorias);
producto_categoria.get('/producto_categoria/:id', ProductoCategoriaController.getInstance().getSingle);
producto_categoria.get('/producto_categoria/subcategorias/:id', ProductoCategoriaController.getInstance().getAllByCategoria);
producto_categoria.post('/producto_categoria', ProductoCategoriaController.getInstance().create);
producto_categoria.put('/producto_categoria/:id', ProductoCategoriaController.getInstance().update);
producto_categoria.delete('/producto_categoria/:id', ProductoCategoriaController.getInstance().delete);

export default producto_categoria;