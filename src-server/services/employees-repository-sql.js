class EmployeesRepositorySql {
	#connection

	constructor(dbParams) {
		this.#connection = mysql.createConnection(dbParams);

	}

	async getOne(id) {

	}

	async getAll() {
	}

	async insertOne(obj) {

	}

	async updateOne(obj) {

	}

	async deleteOne(id) {

	}
}

export default EmployeesRepositorySql;