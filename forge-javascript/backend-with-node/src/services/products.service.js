const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

class ProductsService {
  constructor() {
    this.products = this.initialize();
  }

  initialize() {
    let products = [];
    for (let i = 0; i < 10; i++) {
      products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),
				isBlock: faker.datatype.boolean(),
      });
    }
    return products;
  }

  async getProduct(id) {
		// Careful with this, it's a function inside a class.
    const product = this.findProductById(id);
    if (!product) {
      throw boom.notFound("Product not found");
    }
    if (product.isBlock) {
			throw boom.conflict("Product is blocked");
		}
    return product;
  }

  async getProducts() {
    return this.products;
  }

  async createProduct(product) {
		const newProduct = {
			id: faker.string.uuid(),
			...product,
		}
    this.products.push(newProduct);
		return newProduct;
  }

  async updateProduct(id, changes) {
    const index = this.findProductById(id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    if (this.products[index].isBlock) {
			throw boom.conflict("Product is blocked");
		}
		this.products[index] = {
			...this.products[index],
			...changes,
		};
    return this.products[index];
  }

	async deleteProduct(id) {
		const index = this.findProductById(id);
		if (index === -1) {
			throw boom.notFound("Product not found");
		}
		this.products.splice(index, 1);
	}
}

function findProductById(id) {
	return this.products.find((product) => product.id === id);
}

module.exports = ProductsService;
