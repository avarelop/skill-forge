const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

class UsersService {
  constructor() {
    this.users = this.initialize();
  }

  initialize() {
    let users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(["customer", "employee", "admin"]),
      });
    }
    return users;
  }

  async getUserById(id) {
		// Careful with this, it's a function inside a class.
    const user = findUserById(this.users, id);
    if (!user) {
      throw boom.notFound("User not found");
    }
    return user;
  }

  async getUsers() {
    return this.users;
  }

  async createUser(user) {
		const newUser = {
			id: faker.string.uuid(),
			...user,
		}
    this.users.push(newUser);
		return newUser;
  }

  async updateUser(id, changes) {
    const index = findUserIndexById(this.users, id);
    if (index === -1) {
      throw boom.notFound("User not found");
    }
		this.users[index] = {
			...this.users[index],
			...changes,
		};
    return this.users[index];
  }

	async deleteUser(id) {
		const index = findUserIndexById(this.users, id);
		if (index === -1) {
			throw boom.notFound("User not found");
		}
		this.users.splice(index, 1);
	}
}

function findUserById(users, id) {
	return users.find((user) => user.id === id);
}

function findUserIndexById(users, id) {
	return users.findIndex((user) => user.id === id);
}

module.exports = UsersService;
