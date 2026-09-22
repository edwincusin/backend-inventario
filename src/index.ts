import express from "express";

const app=express();

const PUERTO=3001;

app.use(express.json({limit:'10mb'}));
//app.use("/albumes",albumesRouter)
//app.use("/canciones",cancionesRouter)

app.listen(PUERTO,()=>{
    console.log("servidor corriendo en el puerto : "+PUERTO)
})

