// Importa el cliente de Prisma (generado automáticamente)
import { PrismaClient } from "../generated/prisma/client.js"; 
// Importa el adaptador para conectar Prisma con PostgreSQL
import { PrismaPg } from "@prisma/adapter-pg"; 

// Configura la conexión a la base de datos usando la URL del archivo .env
const adapter= new PrismaPg({
    connectionString:process.env.DATABASE_URL!
});

// Crea el cliente de Prisma para poder usarlo en el proyecto
const prisma =new PrismaClient({adapter});

export default prisma;