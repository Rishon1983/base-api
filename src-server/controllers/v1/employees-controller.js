import EmployeesModel from "../../models/employees-model.js";

class EmployeesController {
	services;

	constructor(services, entityMap) {
		this.services = services;
		entityMap['employees'] = this;
	}

	insertOne(req) {
		const model = new EmployeesModel(req);
		return this.services.employeesRepository.insertOne(model.toData());
	}

	updateOne(req) {
		const model = new EmployeesModel(req);
		return this.services.employeesRepository.updateOne(model.toData());
	}

	deleteOne(id) {
		return this.services.employeesRepository.deleteOne(id);
	}

	getOne(id) {
		return this.services.employeesRepository.getOne(id);
	}

	getAll() {
		return this.services.employeesRepository.getAll();
	}


}

export default EmployeesController;