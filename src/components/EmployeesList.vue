<template>
	<div class="employees-list-component">
		<h1>List of employees</h1>
		<div class="add-employees-container">
			<div @click="isNewEmployeeFormShow = !isNewEmployeeFormShow" class="add-new-employee-button">
				<font-awesome-icon class="icon" :icon="['fas','fa-plus']"></font-awesome-icon>
				<h5>Add new employee</h5>
			</div>
			<Transition name="bounce">
				<div v-if="isNewEmployeeFormShow" class="add-new-employee-form-container">
					<div class="employee-info-component">
						<input class="first-name" v-model="newEmployee.firstName">
						<input class="last-name" v-model="newEmployee.lastName">
						<input class="phone" v-model="newEmployee.phone">
						<input class="mail" v-model="newEmployee.mail">
						<font-awesome-icon @click="addEmployeeData" class="icon" :icon="['fas','fa-check']"
										   title="Apply new employee"></font-awesome-icon>
						<font-awesome-icon @click="clearInputs" class="icon" :icon="['fas','fa-times']"
										   title="Clear inputs"></font-awesome-icon>
					</div>
				</div>
			</Transition>
		</div>
		<div v-if="employeesList.length>0" class="employees-container">
			<div class="employee-headers">
				<div class="first-name">firstName</div>
				<div class="last-name">lastName</div>
				<div class="phone">phone</div>
				<div class="mail">mail</div>
				<div class="buttons-container"></div>
			</div>
			<div class="employees-list">
				<div v-for="(employee, index) in employeesList" :key="employee.id" class="one-employee">
					<EmployeeInfo :data="{employee, index}"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import EmployeeInfo from "./EmployeeInfo.vue";

export default {
	name: "EmployeesList",
	components: {EmployeeInfo},
	data() {
		return {
			editEmployerId: null,
			newEmployee: {
				firstName: '',
				lastName: '',
				phone: '',
				mail: ''
			},
			isNewEmployeeFormShow: false
		}
	},
	computed: {
		...mapState({
			employeesList: state => state.employees.employeesList
		})
	},
	created() {
		this.$store.dispatch("employees/createEmployeesList");
		console.log('employeesList: ', this.employeesList)
	},
	methods: {
		...mapActions('employees', [
			'addEmployee'
		]),
		clearInputs() {
			this.newEmployee = {
				firstName: '',
				lastName: '',
				phone: '',
				mail: ''
			}
		},
		isValid() {
			return this.newEmployee.firstName !== '' && this.newEmployee.lastName !== '' && this.newEmployee.phone !== '' && this.newEmployee.mail !== '';

		},
		addEmployeeData() {
			/*
			* need add validations
			* */
			if (!this.isValid()) {
				alert(`Please, check employee's info`);
				return;
			}
			this.addEmployee(this.newEmployee);
			this.clearInputs();
		}
	}
}
</script>

<style lang="scss" scoped>
.employees-list-component {
	.add-employees-container {
		margin: 5px 0;

		.add-new-employee-button {
			display: flex;
			align-items: center;

			h5 {
				margin: 0;
				padding: 0;
			}

			&:hover {
				cursor: pointer;

				.icon {
					color: green;
				}
			}
		}

		.add-new-employee-form-container {
			.employee-info-component {
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;
				box-sizing: border-box;

				input {
					height: 34px;
					font-size: 17px;
					margin: 0 10px;

					&.first-name, &.last-name {
						width: calc(20% - 20px);
					}

					&.phone {
						width: 110px;
					}

					&.mail {
						width: calc(60% - 230px);
					}
				}

				.icon {
					height: 20px;
					width: 20px;
					padding: 10px;
					color: #a4a4a4;

					&:hover {
						color: black;
						cursor: pointer;
					}

					&.fa-check {
						&:hover {
							color: green;
						}
					}

					&.fa-xmark {
						&:hover {
							color: red;
						}
					}
				}
			}
		}

		.bounce-enter-active {
			animation: bounce-in 0.5s;
		}

		.bounce-leave-active {
			animation: bounce-in 0.5s reverse;
		}

		@keyframes bounce-in {
			0% {
				transform: scale(0);
			}
			50% {
				transform: scale(1.25);
			}
			100% {
				transform: scale(1);
			}
		}
	}

	.employees-container {
		.employee-headers {
			width: 100%;
			height: 30px;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			border-bottom: 1px solid;
			font-weight: bold;

			div {
				margin: 0 10px;
			}

			.first-name, .last-name {
				width: 20%;
			}

			.phone {
				width: 130px;
			}

			.mail {
				width: calc(60% - 210px);
			}

			.buttons-container {
				width: 80px;
			}
		}

		.employees-list {
			max-height: calc(100vh - 300px);
			overflow: auto;
		}

		.one-employee {
			&:nth-child(odd) {
				background-color: #f8f9fa;
			}
		}
	}

}
</style>