import express from "express";
import routerProdutos from "./routes/productosRoute.js";

const app=express();

const PUERTO=3001;

app.use(express.json({limit:'10mb'}));
app.use("/inventario",routerProdutos)

app.listen(PUERTO,()=>{
    console.log("servidor corriendo en el puerto : "+PUERTO)
})

