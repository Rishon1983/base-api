import axios from "axios";

// initial state
const state = {
	employeesList: [],
	editEmployeeId: null
};

// getters are functions.
const getters = {};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
	createEmployeesList({commit}) {

		axios.get('http://localhost:80/api/v1/employees').then(res => {
			commit('setEmployeesList', res.data);
		})
	},
	editMode({commit}, employeeId) {
		commit('setEditEmployeeId', employeeId);
	},

	addEmployee({commit}, employee) {
		axios.post(`http://localhost:80/api/v1/employees`, employee).then(res => {
			if (res.data.error) {
				alert(res.data.error);
				return;
			}
			commit('addEmployee', res.data);
		})
	},

	editEmployee({commit}, data) {
		axios.put(`http://localhost:80/api/v1/employees`, data.employee).then(res => {
			if (res.data.error) {
				alert(res.data.error);
				return;
			}
			commit('editEmployee', {
				employee: res.data,
				index: data.index
			});
		})
	},
	deleteEmployee({commit}, employeeId) {
		axios.delete(`http://localhost:80/api/v1/employees/${employeeId}`).then(res => {
			if (res.data.error) {
				alert(res.data.error);
				return;
			}
			commit('deleteEmployee', employeeId);
		})
	},
};
// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
	setEmployeesList(state, data) {
		state.employeesList = data;
	},
	setEditEmployeeId(state, employeeId) {
		state.editEmployeeId = employeeId;
	},
	addEmployee(state, employee) {
		state.employeesList.push(employee);
		state.editEmployeeId = null;
	},
	editEmployee(state, data) {
		if (state.employeesList[data.index]?.id === data.employee.id) {
			state.employeesList[data.index] = data.employee;
		} else {
			for (let i = 0; i <= state.employeesList.length - 1; i++) {
				if (state.employeesList[i].id === data.employee.id) {
					state.employeesList[i] = data.employee;
					break;
				}
			}
		}
		state.editEmployeeId = null;
	},
	deleteEmployee(state, employeeId) {
		state.employeesList = state.employeesList.filter(employee => employee.id !== employeeId);
		state.editEmployeeId = null;
	},
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}