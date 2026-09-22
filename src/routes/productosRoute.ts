import { Router } from "express";
import {createProducto,deleteProducto,getProductos,updateProducto} from '../controller/productosController.js'


const router=Router();

router.post("/productos/",createProducto);
router.get("/productos/",getProductos);
router.put("/productos/:id",updateProducto);
router.delete("/productos/:id",deleteProducto);

export default router;
