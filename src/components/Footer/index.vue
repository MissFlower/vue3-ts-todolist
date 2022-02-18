<template>
	<div class="flex items-center justify-between text-gray-500">
		<span class="pl-16px">{{ num }} items left</span>
		<div class="flex space-x-8px">
			<Button
				v-for="value in TodoStatusEnum"
				:key="value"
				:type="currentIndex === value ? 'primary' : undefined"
				class="w-100px"
				@click="clickHandle(value)"
				>{{ capitalize(value) }}</Button
			>
		</div>
		<div class="w-136px">
			<Button v-show="showClearBtn" type="link" @click="completeHandle">Clear completed</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
	import { Button, Modal } from 'ant-design-vue'
	import { createVNode, ref, watch } from 'vue'
	import { TodoStatusEnum } from 'src/enums/todo'
	import { capitalize } from 'src/utils'
	import { useRouter } from 'vue-router'
	import type { Ref } from 'vue'
	import type { Router } from 'vue-router'

	const props = withDefaults(
		defineProps<{
			num: number
			showClearBtn: boolean
			status: TodoStatusEnum
		}>(),
		{
			num: 0,
			showClearBtn: false
		}
	)
	const router: Router = useRouter()
	const emit = defineEmits<{ (e: 'complete'): void }>()
	const currentIndex: Ref<TodoStatusEnum> = ref(TodoStatusEnum.ALL)

	const clickHandle = (value: TodoStatusEnum) => {
		if (currentIndex.value === value) {
			return
		}
		router.push({
			path: `/${value}`
		})
		currentIndex.value = value
	}
	const completeHandle = () => {
		Modal.confirm({
			title: () => 'Do you Want to clear completed ?',
			icon: () => createVNode(ExclamationCircleOutlined),
			okText: '确定',
			cancelText: '取消',
			onOk() {
				emit('complete')
			},
			onCancel() {
				console.log('Cancel')
			}
		})
	}

	watch(
		() => props.status,
		(newVal: TodoStatusEnum) => {
			currentIndex.value = newVal
		},
		{
			immediate: true
		}
	)
</script>
