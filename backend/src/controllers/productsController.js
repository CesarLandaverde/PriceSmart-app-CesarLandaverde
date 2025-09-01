//Array de metodos (C R U D)
const productsController = {};
import productsModel from "../models/Products.js";

// SELECT
productsController.getProducts = async (req, res) => {
  const products = await productsModel.find();
  res.json(products);
};

// INSERT
productsController.createProducts = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = new productsModel({ name, description, price });
    await newProduct.save();
    console.log("Producto guardado:", newProduct);
    res.json({ message: "product saved" });
  } catch (error) {
    console.error("Error al guardar producto:", error);
    res.status(500).json({ message: "Error al guardar producto" });
  }
};

// DELETE
productsController.deleteProducts = async (req, res) => {
  const deletedProduct = await productsModel.findByIdAndDelete(req.params.Id);
  if (!deletedProduct) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.json({ message: "product deleted" });
};

// UPDATE
productsController.updateProducts = async (req, res) => {
  // Solicito todos los valores
  const { name, description, price } = req.body;
  // Actualizo
  await productsModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      stock,
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "product updated" });
};

productsController.getSingleProduct = async (req, res) => {
  const product = await productsModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.json(product);
};

export default productsController;
