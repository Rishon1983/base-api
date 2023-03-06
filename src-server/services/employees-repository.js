const memory = {
	"1": {
		id: "1",
		firstName: 'firstName',
		lastName: 'lastNamelastName',
		phone: '054-7999925',
		mail: 'somemail@gmail.com',
	},
	"2": {
		id: "2",
		firstName: 'firstNameNAme2',
		lastName: 'Name2',
		phone: '054-7958525',
		mail: 'some@gmail.com',
	},
	"3": {
		id: "3",
		firstName: 'firstNamesfessesee3',
		lastName: 'lastNameafdsefs3',
		phone: '054-1284525',
		mail: 'somemailsomemail@gmail.com',
	},
	"4": {
		id: "4",
		firstName: 'firs4',
		lastName: 'last4',
		phone: '054-7912325',
		mail: 'som@gmail.com',
	},
};

class EmployeesRepository {
	async getOne(id) {
		if (!memory.hasOwnProperty(id)) {
			throw new Error('Record not found');
		}

		return memory[id];
	}

	async getAll() {
		return Object.values(memory);
	}

	async insertOne(obj) {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const id = Date.now() + characters.charAt(Math.floor(Math.random() * 4));
		obj.id = id;
		memory[id] = obj;
		return obj;
	}

	async updateOne(obj) {
		if (!memory.hasOwnProperty(obj.id)) {
			throw new Error('Record not found');
		}

		memory[obj.id] = obj;
		return obj;
	}

	async deleteOne(id) {
		if (!memory.hasOwnProperty(id)) {
			throw new Error('Record not found');
		}

		delete memory[id];
		return 'deleted';
	}
}

export default EmployeesRepository;