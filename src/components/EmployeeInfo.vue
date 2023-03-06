<template>
	<div v-if="!isEditMode" class="employee-info-component">
		<div class="first-name" :title="data.employee.firstName">{{ data.employee.firstName }}</div>
		<div class="last-name" :title="data.employee.lastName">{{ data.employee.lastName }}</div>
		<div class="phone" :title="data.employee.phone">{{ data.employee.phone }}</div>
		<div class="mail" :title="data.employee.mail">{{ data.employee.mail }}</div>
		<div class="buttons-container">
			<font-awesome-icon @click="edit" class="icon" :icon="['fas','fa-edit']"
							   title="edit employee info"></font-awesome-icon>
			<font-awesome-icon @click="deleteEmployee(data.employee.id)" class="icon" :icon="['fas','fa-trash']"
							   title="delete employee"></font-awesome-icon>
		</div>
	</div>
	<div v-else class="employee-info-component edit">
		<input class="first-name" v-model="editEmployeeData.firstName">
		<input class="last-name" v-model="editEmployeeData.lastName">
		<input class="phone" v-model="editEmployeeData.phone">
		<input class="mail" v-model="editEmployeeData.mail">
		<div class="buttons-container">
			<font-awesome-icon @click="editEmployeeLocal" class="icon" :icon="['fas','fa-check']"
							   title="Apply"></font-awesome-icon>
			<font-awesome-icon @click="cancelEdit" class="icon" :icon="['fas','fa-times']"
							   title="Cancel"></font-awesome-icon>
		</div>
	</div>
</template>

<script>
// import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

import {mapState, mapActions} from "vuex";

export default {
	name: "EmployeeInfo",
	// components: {FontAwesomeIcon},
	props: ['data'],
	data() {
		return {
			isEditMode: false,
			editEmployeeData: {
				id: this.data.employee.id,
				firstName: this.data.employee.firstName,
				lastName: this.data.employee.lastName,
				phone: this.data.employee.phone,
				mail: this.data.employee.mail,
			}
		}
	},
	created() {
		this.initEditModeData();
	},
	computed: {
		...mapState({
			editEmployeeId: state => state.employees.editEmployeeId
		})
	},
	methods: {
		...mapActions('employees', [
			'editMode',
			'deleteEmployee',
			'editEmployee'
		]),
		initEditModeData() {
			this.editEmployeeData = {
				id: this.data.employee.id,
				firstName: this.data.employee.firstName,
				lastName: this.data.employee.lastName,
				phone: this.data.employee.phone,
				mail: this.data.employee.mail
			}
		},
		edit() {
			this.editMode(this.data.employee.id);
		},
		editEmployeeLocal() {
			if (!this.isValidEmployeeData()) {
				alert('Please, check employee information');
				return;
			}
			this.editEmployee({
				employee: this.editEmployeeData,
				index: this.data.index
			});
		},
		cancelEdit() {
			this.editMode(null);
		},
		isValidEmployeeData() {
			return this.firstName !== '' &&
				this.lastName !== '' &&
				this.phone !== '' &&
				this.mail !== '';
		}
	},
	watch: {
		editEmployeeId() {
			this.isEditMode = this.editEmployeeId === this.data.employee.id;
			this.initEditModeData();
		}
	}
}
</script>

<style lang="scss" scoped>
.employee-info-component {
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	box-sizing: border-box;

	div {
		margin: 0 10px;
	}

	input {
		height: 28px;
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

	.first-name, .last-name, .phone, .mail {
		white-space: nowrap;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
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
		display: flex;
		margin: 0;
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

	&.edit {
		background-color: #e0e0e0;

		.icon {
			color: #7d7d7d;
		}
	}
}
</style>