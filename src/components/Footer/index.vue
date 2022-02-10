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
				>{{ value }}</Button
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
	import { createVNode, ref } from 'vue'
	import { TodoStatusEnum } from 'src/enums/todo'

	withDefaults(
		defineProps<{
			num: number | string
			showClearBtn: boolean
		}>(),
		{
			num: 0,
			showClearBtn: false
		}
	)
	const emit =
		defineEmits<{ (e: 'change', current: TodoStatusEnum): void; (e: 'complete'): void }>()
	const currentIndex = ref(TodoStatusEnum.ALL)

	const clickHandle = (value: TodoStatusEnum) => {
		if (currentIndex.value === value) {
			return
		}
		currentIndex.value = value
		emit('change', currentIndex.value)
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
</script>

<style scoped></style>
