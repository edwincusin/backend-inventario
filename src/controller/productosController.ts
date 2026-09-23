import type { Request, Response } from "express";
import prisma from "../database/prisma.js"; // ajusta esta ruta según dónde tengas tu archivo de conexión

// ============================================
// GET /productos - Listar todo el inventario
// ============================================
export const getProductos = async (req: Request, res: Response) => {
    try {
        const productos = await prisma.producto.findMany({
            orderBy: { createdAt: "desc" },
        });
        return res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return res.status(500).json({ error: "Error al obtener los productos" });
    }
};

// ============================================
// POST /productos - Crear un nuevo producto
// ============================================
export const createProducto = async (req: Request, res: Response) => {
    try {
        const { nombre, precio, categoria, fotoBase64,  codigoBarras} = req.body;

        if (!nombre || precio === undefined || !categoria) {
            return res.status(400).json({
                error: "Los campos 'nombre', 'precio' y 'categoria' son obligatorios",
            });
        }

        if (typeof precio !== "number" || precio <= 0) {
            return res.status(400).json({
                error: "El campo 'precio' debe ser un número mayor a 0",
            });
        }

        const nuevoProducto = await prisma.producto.create({
            data: {
                nombre,
                precio,
                categoria,
                fotoBase64: fotoBase64 ?? null,
                codigoBarras,
            },
        });

        return res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error("Error al crear producto:", error);
        return res.status(500).json({ error: "Error al crear el producto" });
    }
};

// ============================================
// PUT /productos/:id - Editar precio o foto
// ============================================
export const updateProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, precio, categoria, fotoBase64 } = req.body;

        const productoId = Number(id);
        if (isNaN(productoId)) {
            return res.status(400).json({ error: "El id debe ser un número válido" });
        }

        const productoExistente = await prisma.producto.findUnique({
            where: { id: productoId },
        });

        if (!productoExistente) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        if (precio !== undefined && (typeof precio !== "number" || precio <= 0)) {
            return res.status(400).json({
                error: "El campo 'precio' debe ser un número mayor a 0",
            });
        }

        const productoActualizado = await prisma.producto.update({
            where: { id: productoId },
            data: {
                ...(nombre !== undefined && { nombre }),
                ...(precio !== undefined && { precio }),
                ...(categoria !== undefined && { categoria }),
                ...(fotoBase64 !== undefined && { fotoBase64 }),
            },
        });

        return res.status(200).json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({ error: "Error al actualizar el producto" });
    }
};

// ============================================
// DELETE /productos/:id - Borrar un producto
// ============================================
export const deleteProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productoId = Number(id);

        if (isNaN(productoId)) {
            return res.status(400).json({ error: "El id debe ser un número válido" });
        }

        const productoExistente = await prisma.producto.findUnique({
            where: { id: productoId },
        });

        if (!productoExistente) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        await prisma.producto.delete({
            where: { id: productoId },
        });

        return res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return res.status(500).json({ error: "Error al eliminar el producto" });
    }
};