class Employees {
	data = {
		id: '',
		firstName: '',
		lastName: '',
		phone: '',
		mail: '',
	};

	constructor(req) {
		for (const argumentKey in req.body) {
			if (this.data.hasOwnProperty(argumentKey)) {
				this.data[argumentKey] = req.body[argumentKey];
			}
		}
	}

	toData() {
		return this.data;
	}
}

export default Employees;