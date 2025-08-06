const Product = require ('../models/product');

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//get all products
exports.getProducts = async (req, res) => {
    try{
        const products = await Products.find();
    res.json(products);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    } 
};
//get single product
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};