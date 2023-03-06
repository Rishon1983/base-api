<script setup>
import EmployeesList from "./components/EmployeesList.vue";
</script>

<template>

	<EmployeesList/>
	<a href="https://goralex.com" target="_blank" class="logo">
		<img src="./assets/logo-home.svg" alt="Goralex logo"/>
	</a>
</template>

<style lang="scss" scoped>
.logo {
	position: fixed;
	bottom: 0;
	height: 2em;
	will-change: filter;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
