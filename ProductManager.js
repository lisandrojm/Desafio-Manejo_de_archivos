////////////////////////////////////////////////////////////////////////////////
/* DESAFÍO ENTREGABLE */

////////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
class ProductManager {
  constructor(path) {
    this.path = path;
  }
  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      id: this.getNewId(products),
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
    };
    products.push(newProduct);
    this.saveProducts(products);
  }
  getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  getProductById(id) {
    const products = this.getProducts();
    return products.find((product) => product.id === id) || null;
  }
  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      this.saveProducts(products);
    } else {
      throw new Error(`Product with id ${id} not found.`);
    }
  }
  deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      this.saveProducts(products);
    } else {
      throw new Error(`Product with id ${id} not found.`);
    }
  }
  getNewId(products) {
    const productIds = products.map((product) => product.id);
    return productIds.length > 0 ? Math.max(...productIds) + 1 : 1;
  }
  saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }
}
