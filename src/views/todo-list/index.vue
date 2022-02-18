<template>
	<div class="w-750px mt-50px">
		<!-- 标题 -->
		<div class="text-100px h-100px leading-100px font-thin text-gray-300">Todos</div>

		<div class="bg-light-50 p-16px">
			<!-- 头部搜索和多选框 -->
			<Header v-model:checked="checkAll" @add="addHandle" @check-all="checkAllHandle" />

			<!-- todolist容器wrap -->
			<div id="todoWrap" class="max-h-[calc(100vh-300px)] mt-12px overflow-auto">
				<TodoItem
					v-for="list of state.lists"
					:key="list.id"
					v-model:checked="list.checked"
					v-model:value.trim="list.value"
					:edited="list.edited"
					@checkbox-change="(e: Event) => changeHandle(e)"
					@blur="saveHandle(list.id)"
					@remove="removeHandle(list.id)"
					@open-edit="openEditHandle(list.id)"
				/>
			</div>

			<!-- footer -->
			<Footer
				:num="unCompletedNum"
				:status="status"
				:show-clear-btn="showClearBtn"
				@complete="completeHandle"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Header from 'src/components/Header/index.vue'
	import TodoItem from 'src/components/TodoItem/index.vue'
	import Footer from 'src/components/Footer/index.vue'
	import { TodoStatusEnum } from 'src/enums/todo'
	import { readTodo, saveTodo } from 'src/utils/localStorage'
	import { onMounted, reactive, ref, watch } from 'vue'
	import { nanoid } from 'nanoid'
	import { useSortable } from 'src/hooks/useSortable'
	import { IState, ITodo } from '#/todolist'
	import { useRoute } from 'vue-router'
	import type { Ref } from 'vue'
	import type { RouteLocationNormalizedLoaded } from 'vue-router'

	const state: IState = reactive({
		allLists: [],
		lists: []
	})
	// 当前状态
	const status: Ref<TodoStatusEnum> = ref(TodoStatusEnum.ALL)
	// 全选状态
	const checkAll: Ref<boolean> = ref(false)
	// 未完成条数
	const unCompletedNum: Ref<number> = ref(0)
	// 是否展示clear completed按钮
	const showClearBtn: Ref<boolean> = ref(false)
	const route: RouteLocationNormalizedLoaded = useRoute()

	onMounted(() => {
		initData()
		getCurrentData(status.value)
		sortableHandle()
	})

	// init
	const initData = () => {
		state.allLists = readTodo()
	}

	// add todo
	const addHandle = (value: string): void => {
		state.allLists.unshift({
			id: nanoid(),
			checked: false,
			edited: false,
			value
		})
	}

	// checkall
	const checkAllHandle = (e: Event): void => {
		state.allLists.forEach((item: ITodo) => {
			item.checked = (e.target as HTMLInputElement).checked
		})
		getCurrentData(status.value)
	}

	// reverse check
	const changeHandle = (e: Event): void => {
		checkAll.value = (e.target as HTMLInputElement).checked
			? state.allLists.every((list: ITodo) => list.checked)
			: false
		getCurrentData(status.value)
	}

	// get index
	const getIndex = (id: string): number => {
		return state.allLists.findIndex((item: ITodo) => item.id === id)
	}
	// save edit
	const saveHandle = (id: string): void => {
		state.allLists[getIndex(id)].edited = false
	}

	// remove todo
	const removeHandle = (id: string): void => {
		state.allLists.splice(getIndex(id), 1)
	}

	// edit
	const openEditHandle = (id: string): void => {
		state.allLists[getIndex(id)].edited = true
	}

	// allcheck status
	const changeAllCheckStatus = () => {
		checkAll.value =
			state.lists.length > 0 ? state.lists.every((list: ITodo) => list.checked) : false
	}

	// chang status
	const getCurrentData = (value: TodoStatusEnum): void => {
		status.value = value
		switch (value) {
			case TodoStatusEnum.ALL:
				state.lists = state.allLists
				break
			case TodoStatusEnum.ACTIVE:
				state.lists = state.allLists.filter((item: ITodo) => !item.checked)
				break
			case TodoStatusEnum.COMPLETED:
				state.lists = state.allLists.filter((item: ITodo) => item.checked)
				break

			default:
				break
		}
		changeAllCheckStatus()
	}

	// completed
	const completeHandle = (): void => {
		const ids = state.allLists.filter((item: ITodo) => item.checked).map((item: ITodo) => item.id)
		ids.forEach((id: string) => {
			state.allLists.splice(getIndex(id), 1)
		})
		changeAllCheckStatus()
	}

	// dragable
	const sortableHandle = (): void => {
		const el = document.querySelector('#todoWrap') as HTMLElement
		const { initSortable } = useSortable(el, {
			handle: '.move',
			onEnd: ({ oldIndex, newIndex }) => {
				if (oldIndex === newIndex) {
					return
				}
				const item: ITodo[] = state.allLists.splice(oldIndex as number, 1)
				state.allLists.splice(newIndex as number, 0, ...item)
			}
		})
		initSortable()
	}

	watch(
		() => route.path,
		(val) => {
			status.value = val.slice(1) as TodoStatusEnum
			getCurrentData(status.value)
		},
		{
			immediate: true
		}
	)

	watch(
		() => state.allLists,
		() => {
			saveTodo(state.allLists)
			unCompletedNum.value = state.allLists.filter((item: ITodo) => !item.checked).length
			showClearBtn.value = unCompletedNum.value < state.allLists.length
		},
		{
			deep: true
		}
	)
</script>
