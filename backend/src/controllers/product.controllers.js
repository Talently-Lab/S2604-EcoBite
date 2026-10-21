
import {
  findRestaurantByUserId,
  createProduct,
  getProductsByRestaurantId
} from "../repositories/product.repository.js";

export async function createProductController(req, res) {
  try {
    const {
      nombre,
      descripcion,
      precio,
      imagen_url
    } = req.body;

    // Validaciones
    if (typeof nombre !== "string" || !nombre.trim()) {
      return res.status(400).json({
        message: "El nombre del plato es obligatorio"
      });
    }

    if (nombre.trim().length > 150) {
      return res.status(400).json({
        message: "El nombre no puede superar los 150 caracteres"
      });
    }

    if (
      precio === undefined ||
      precio === null ||
      precio === "" ||
      !Number.isFinite(Number(precio)) ||
      Number(precio) <= 0
    ) {
      return res.status(400).json({
        message: "El precio debe ser un número mayor que cero"
      });
    }

    if (
      descripcion !== undefined &&
      descripcion !== null &&
      typeof descripcion !== "string"
    ) {
      return res.status(400).json({
        message: "La descripción debe ser un texto"
      });
    }

    if (
      imagen_url !== undefined &&
      imagen_url !== null &&
      imagen_url !== ""
    ) {
      try {
        const url = new URL(imagen_url);

        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("URL inválida");
        }
      } catch {
        return res.status(400).json({
          message: "La URL de la imagen no es válida"
        });
      }
    }

    const restaurant = await findRestaurantByUserId(
      req.user.id
    );

    if (!restaurant) {
      return res.status(404).json({
        message: "No se encontró un restaurante activo asociado a tu cuenta"
      });
    }


    const product = await createProduct({
      restaurante_id: restaurant.id,
      nombre: nombre.trim(),
      descripcion: descripcion?.trim() || null,
      precio: Number(precio),
      imagen_url: imagen_url || null
    });

    return res.status(201).json({
      message: "Plato creado correctamente",
      producto: product
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al crear el plato"
    });
  }
}

export async function getRestaurantProductsController(req, res) {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        message: "ID de restaurante inválido"
      });
    }

    const products = await getProductsByRestaurantId(Number(id));

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);

    return res.status(500).json({
      message: "Error al obtener los productos del restaurante"
    });
  }
}
