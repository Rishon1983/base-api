import { createStore } from 'vuex'
import employeesList from "./modules/employees-list.js";

const store = createStore({ /* options */ })

store.registerModule('employees', employeesList)

export default store