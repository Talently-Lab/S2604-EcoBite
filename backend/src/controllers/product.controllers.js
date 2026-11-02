
import {
  findRestaurantByUserId,
  createProduct,
  getProductsByRestaurantId,
  getAllProductsByRestaurantId,
  getTipoEnvaseById,
  getTiposEnvase,
  getCategoriaProductoById,
  getCategoriasProducto,
  updateProduct, 
  toggleProductStatus
} from "../repositories/product.repository.js";

export async function createProductController(req, res) {
  try {
    const {
      nombre,
      descripcion,
      precio,
      imagen_url,
      tipo_envase_id,
      categoria_producto_id,
    } = req.body;

    if (typeof nombre !== "string" || !nombre.trim()) {
      return res.status(400).json({
        message: "El nombre del plato es obligatorio",
      });
    }

    if (nombre.trim().length > 150) {
      return res.status(400).json({
        message: "El nombre no puede superar los 150 caracteres",
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
        message: "El precio debe ser un número mayor que cero",
      });
    }

    if (
      !Number.isInteger(Number(tipo_envase_id)) ||
      Number(tipo_envase_id) <= 0
    ) {
      return res.status(400).json({
        message: "Debés seleccionar un tipo de envase válido",
      });
    }

    if (
      categoria_producto_id === undefined ||
      categoria_producto_id === null ||
      categoria_producto_id === "" ||
      !Number.isInteger(Number(categoria_producto_id)) ||
      Number(categoria_producto_id) <= 0
    ) {
      return res.status(400).json({
        message: "Debés seleccionar una categoría válida",
      });
    }

    if (
      descripcion !== undefined &&
      descripcion !== null &&
      typeof descripcion !== "string"
    ) {
      return res.status(400).json({
        message: "La descripción debe ser un texto",
      });
    }

    if (
      imagen_url !== undefined &&
      imagen_url !== null &&
      imagen_url !== ""
    ) {
      if (typeof imagen_url !== "string") {
        return res.status(400).json({
          message: "La URL de la imagen no es válida",
        });
      }

      try {
        const url = new URL(imagen_url);

        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("URL inválida");
        }
      } catch {
        return res.status(400).json({
          message: "La URL de la imagen no es válida",
        });
      }
    }

    const tipoEnvase = await getTipoEnvaseById(
      Number(tipo_envase_id)
    );

    if (!tipoEnvase) {
      return res.status(400).json({
        message: "El tipo de envase seleccionado no existe",
      });
    }

    const categoria = await getCategoriaProductoById(
      Number(categoria_producto_id)
    );

    if (!categoria) {
      return res.status(400).json({
        message: "La categoría seleccionada no existe",
      });
    }

    const restaurant = await findRestaurantByUserId(req.user.id);

    if (!restaurant) {
      return res.status(404).json({
        message:
          "No se encontró un restaurante activo asociado a tu cuenta",
      });
    }

    const product = await createProduct({
      restaurante_id: restaurant.id,
      nombre: nombre.trim(),
      descripcion: descripcion?.trim() || null,
      precio: Number(precio),
      imagen_url: imagen_url || null,
      tipo_envase_id: Number(tipo_envase_id),
      categoria_producto_id: Number(categoria_producto_id),
    });

    return res.status(201).json({
      message: "Plato creado correctamente",
      producto: product,
    });
  } catch (error) {
    console.error("Error al crear el plato:", error);

    return res.status(500).json({
      message: "Error al crear el plato",
    });
  }
}

export async function getRestaurantProductsController(req, res) {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        message: "ID de restaurante inválido",
      });
    }

    const products = await getProductsByRestaurantId(Number(id));

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);

    return res.status(500).json({
      message: "Error al obtener los productos del restaurante",
    });
  }
}
// Obtener todos los productos del restaurante autenticado incluyendo activos y desactivados
export async function getMyProductsController(req, res) {
  try {
    const restaurant = await findRestaurantByUserId(req.user.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "No se encontró un restaurante activo asociado a tu cuenta",
      });
    }

    const products = await getAllProductsByRestaurantId(restaurant.id);

    return res.status(200).json({
      total: products.length,
      productos: products,
    });

  } catch (error) {
    console.error("Error al obtener los productos del restaurante:", error);

    return res.status(500).json({
      message: "Error al obtener los productos del restaurante",
    });
  }
}
export async function getTiposEnvaseController(req, res) {
  try {
    const tipos = await getTiposEnvase();

    return res.status(200).json(tipos);
  } catch (error) {
    console.error("Error al obtener los tipos de envase:", error);

    return res.status(500).json({
      message: "Error al obtener los tipos de envase",
    });
  }
}

export async function getCategoriasProductoController(req, res) {
  try {
    const categorias = await getCategoriasProducto();

    return res.status(200).json(categorias);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);

    return res.status(500).json({
      message: "Error al obtener las categorías de productos",
    });
  }
}

// Actualizar un producto del restaurante autenticado
export async function updateProductController(req, res) {
  try {
    const productoId = Number(req.params.id);

    if (!Number.isInteger(productoId) || productoId <= 0) {
      return res.status(400).json({
        message: "ID de producto inválido",
      });
    }

    const {
      nombre,
      descripcion,
      precio,
      imagen_url,
      tipo_envase_id,
      categoria_producto_id,
    } = req.body;

    // Validar nombre
    if (typeof nombre !== "string" || !nombre.trim()) {
      return res.status(400).json({
        message: "El nombre del plato es obligatorio",
      });
    }

    if (nombre.trim().length > 150) {
      return res.status(400).json({
        message: "El nombre no puede superar los 150 caracteres",
      });
    }

    // Validar precio
    if (
      precio === undefined ||
      precio === null ||
      precio === "" ||
      !Number.isFinite(Number(precio)) ||
      Number(precio) <= 0
    ) {
      return res.status(400).json({
        message: "El precio debe ser un número mayor que cero",
      });
    }

    // Validar tipo de envase
    if (
      !Number.isInteger(Number(tipo_envase_id)) ||
      Number(tipo_envase_id) <= 0
    ) {
      return res.status(400).json({
        message: "Debés seleccionar un tipo de envase válido",
      });
    }

    // Validar categoría
    if (
      categoria_producto_id === undefined ||
      categoria_producto_id === null ||
      categoria_producto_id === "" ||
      !Number.isInteger(Number(categoria_producto_id)) ||
      Number(categoria_producto_id) <= 0
    ) {
      return res.status(400).json({
        message: "Debés seleccionar una categoría válida",
      });
    }

    // Validar descripción
    if (
      descripcion !== undefined &&
      descripcion !== null &&
      typeof descripcion !== "string"
    ) {
      return res.status(400).json({
        message: "La descripción debe ser un texto",
      });
    }

    // Validar URL de imagen
    if (
      imagen_url !== undefined &&
      imagen_url !== null &&
      imagen_url !== ""
    ) {
      if (typeof imagen_url !== "string") {
        return res.status(400).json({
          message: "La URL de la imagen no es válida",
        });
      }

      try {
        const url = new URL(imagen_url);

        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("URL inválida");
        }
      } catch {
        return res.status(400).json({
          message: "La URL de la imagen no es válida",
        });
      }
    }

    // Comprobar que exista el tipo de envase
    const tipoEnvase = await getTipoEnvaseById(
      Number(tipo_envase_id)
    );

    if (!tipoEnvase) {
      return res.status(400).json({
        message: "El tipo de envase seleccionado no existe",
      });
    }

    // Comprobar que exista la categoría
    const categoria = await getCategoriaProductoById(
      Number(categoria_producto_id)
    );

    if (!categoria) {
      return res.status(400).json({
        message: "La categoría seleccionada no existe",
      });
    }

    // Obtener el restaurante del usuario autenticado
    const restaurant = await findRestaurantByUserId(req.user.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "No se encontró un restaurante activo asociado a tu cuenta",
      });
    }

    // Actualizar producto
    const product = await updateProduct({
      productoId,
      restauranteId: restaurant.id,
      nombre: nombre.trim(),
      descripcion: descripcion?.trim() || null,
      precio: Number(precio),
      imagen_url: imagen_url || null,
      tipo_envase_id: Number(tipo_envase_id),
      categoria_producto_id: Number(categoria_producto_id),
    });

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado en tu restaurante",
      });
    }

    return res.status(200).json({
      message: "Plato actualizado correctamente",
      producto: product,
    });

  } catch (error) {
    console.error("Error al actualizar el plato:", error);

    return res.status(500).json({
      message: "Error al actualizar el plato",
    });
  }
}
export async function toggleProductStatusController(req, res) {
  try {
    const productoId = Number(req.params.id);

    if (!Number.isInteger(productoId) || productoId <= 0) {
      return res.status(400).json({
        message: "ID de producto inválido",
      });
    }

    const { activo } = req.body;

    if (typeof activo !== "boolean") {
      return res.status(400).json({
        message: "El estado activo debe ser true o false",
      });
    }

    const restaurant = await findRestaurantByUserId(req.user.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurante no encontrado",
      });
    }

    const product = await toggleProductStatus({
      productoId,
      restauranteId: restaurant.id,
      activo,
    });

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado en tu restaurante",
      });
    }

    return res.status(200).json({
      message: activo
        ? "Producto activado correctamente"
        : "Producto desactivado correctamente",
      producto: product,
    });
  } catch (error) {
    console.error("Error al cambiar el estado del producto:", error);

    return res.status(500).json({
      message: "Error al cambiar el estado del producto",
    });
  }
}