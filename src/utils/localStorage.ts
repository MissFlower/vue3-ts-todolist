import { ITodo } from '#/todolist.d'

export function readTodo(): ITodo[] {
	return JSON.parse(localStorage.getItem('todoLists') || '[]')
}

export function saveTodo(value: ITodo[]) {
	localStorage.setItem('todoLists', JSON.stringify(value))
}
