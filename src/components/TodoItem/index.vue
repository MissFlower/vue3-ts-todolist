<template>
	<div class="flex items-center space-x-4px mb-12px">
		<Checkbox v-bind="$attrs" :checked="checked" class="w-24px" @change="changeHandle" />

		<Input v-if="edited" :value="value" v-bind="$attrs" class="flex-1" />
		<div
			v-else
			class="flex-1 h-32px leading-32px border border-gray-300 text-left pl-11px cursor-pointer"
			:class="[checked ? 'line-through text-gray-300' : 'no-underline text-gray-500']"
			@dblclick="openEditHandle"
			>{{ value }}</div
		>

		<div
			class="flex justify-center items-center w-32px h-32px border border-gray-300 cursor-move move"
		>
			<DragOutlined />
		</div>

		<div
			class="flex justify-center items-center w-32px h-32px border border-gray-300 cursor-pointer"
			@click="removeHandle"
		>
			<CloseOutlined class="transition-transform transform hover:rotate-180" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Checkbox, Input } from 'ant-design-vue'
	import { CloseOutlined, DragOutlined } from '@ant-design/icons-vue'

	interface ITodoItem {
		checked: boolean
		edited: boolean
		value: string
	}
	withDefaults(defineProps<ITodoItem>(), {
		checked: false,
		edited: false,
		value: ''
	})
	const emit = defineEmits<{
		(e: 'checkboxChange', value: Event): void
		(e: 'remove'): void
		(e: 'openEdit'): void
	}>()

	// all checked
	const changeHandle = (e: Event) => {
		emit('checkboxChange', e)
	}
	// remove
	const removeHandle = () => {
		emit('remove')
	}
	// open edit status
	const openEditHandle = () => {
		emit('openEdit')
	}
</script>
