import express from 'express';
import EmployeesRepository from "./services/employees-repository.js";
import ApiV1Controller from "./controllers/api-v1-controller.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

const services = {
	employeesRepository: new EmployeesRepository(),

	/*employeesRepository: new EmployeesRepository({
		host: 'localhost',
		user: 'root',
		password: '',
		charset: 'utf8_general_ci',
		database: 'test'
	}),*/
	//usersRepository: new UsersRepository
};

const apiController = new ApiV1Controller(app, services);
apiController.registerRoutes();

app.listen(80, () => {
	console.log('Main Server started ');
});

