import { Router } from "express";
import ProductoPlantillaController from "../controllers/producto-plantillas.controller";
const producto = Router();

producto.get('/producto', ProductoPlantillaController.getInstance().getAll);
producto.get('/producto/empresas/:ids', ProductoPlantillaController.getInstance().getAllByEmpresa);
producto.get('/producto/barcode/:barcode', ProductoPlantillaController.getInstance().getByBarcode);
producto.get('/producto/categoria/:id', ProductoPlantillaController.getInstance().getByCategoria);
producto.post('/producto', ProductoPlantillaController.getInstance().create);
producto.put('/producto', ProductoPlantillaController.getInstance().update);
producto.delete('/producto/:id', ProductoPlantillaController.getInstance().delete);

export default producto;