<template>
	<div class="flex items-center space-x-4px">
		<Checkbox v-bind="$attrs" class="w-24px" @change="checkAllHandle" />
		<Input
			v-model:value.trim="keyword"
			placeholder="What need to be done?"
			class="flex-1"
			@press-enter="addHandle"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, defineEmits } from 'vue'
	import { Input, Checkbox } from 'ant-design-vue'
	import type { Ref } from 'vue'

	const emit =
		defineEmits<{ (e: 'add', value: string): void; (e: 'checkAll', value: Event): void }>()

	const keyword: Ref<string> = ref('')

	const addHandle = () => {
		keyword.value !== '' && emit('add', keyword.value)
		keyword.value = ''
	}

	const checkAllHandle = (e: Event) => {
		emit('checkAll', e)
	}
</script>
