import EmployeesController from "./v1/employees-controller.js";

const entityMap = {};

class ApiV1Controller {
	#app;

	constructor(app, services) {
		new EmployeesController(services, entityMap);
		//new UsersController(services, entityMap);


		this.#app = app;
	}

	registerRoutes() {
		this.#app.all('/api/v1/:entity*', (req, res) => {
			const controller = this.#getController(req.params.entity);
			let result;

			try {
				switch (req.method) {
					case 'GET':
						const id = this.#getIdFromRequest(req);
						if (id === '') {
							result = controller.getAll();
						} else {
							result = controller.getOne(id);
						}
						break;
					case 'POST':
						result = controller.insertOne(req);
						break;
					case 'PUT':
						result = controller.updateOne(req);
						break;
					case 'DELETE':
						result = controller.deleteOne(this.#getIdFromRequest(req));
						break;

					default:
						// throw new Error('Unsupported method');
				}

				result.then(data => res.json(data));
			} catch (e) {
				res.json({error: e.message});
			}


		});
	}

	#getIdFromRequest(req) {
		return req.params['0'].substring(1);
	}

	#getController(entity) {
		return entityMap[entity];
	}
}

export default ApiV1Controller;