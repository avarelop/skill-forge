const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");
class CategoriesService {
  constructor() {
    this.categories = this.initialize();
  }

  initialize() {
		const categories = [];
		for (let i = 0; i < 10; i++) {
			categories.push({
				id: faker.string.uuid(),
				name: faker.commerce.department(),
			});
		}
    return categories;
  }

  async getCategoryById(id) {
		const category = findCategoryById(this.categories, id);
		if (!category) {
			throw boom.notFound("Category not found");
		}
		return category;
	}

  async getCategories() {
		return this.categories;
	}

	async createCategory(category) {
		const newCategory = {
			id: faker.string.uuid(),
			...category,
		}
		this.categories.push(newCategory);
		return newCategory;
	}

	async updateCategory(id, changes) {
		const index = findCategoryIndexById(this.categories, id);
		if (index === -1) {
			throw boom.notFound("Category not found");
		}
		this.categories[index] = {
			...this.categories[index],
			...changes,
		};
		return this.categories[index];
	}

	async deleteCategory(id) {
		const index = findCategoryIndexById(this.categories, id);
		if (index === -1) {
			throw boom.notFound("Category not found");
		}
		this.categories.splice(index, 1);
	}
}

function findCategoryById(categories, id) {
	return categories.find((category) => category.id === id);
}

function findCategoryIndexById(categories, id) {
	return categories.findIndex((category) => category.id === id);
}

module.exports = CategoriesService;
