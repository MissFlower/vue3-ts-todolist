<template>
	<TodoList />
</template>

<script setup lang="ts">
	import TodoList from 'src/views/todo-list/index.vue'
</script>

<style>
	#app {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		height: 100%;
		display: flex;
		justify-content: center;
		background-color: #f5f5f5;
	}
</style>
