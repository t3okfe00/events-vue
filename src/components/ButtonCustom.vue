<script setup>
const props = defineProps({
  label: String
})

defineEmits(['click'])
</script>
<template>
  <button
    @click="$emit('click')"
    class="border-2 border-gray-400 rounded-md text-sm font-medium px-3 py-1 hover:bg-gray-300"
  >
    {{ props.label }}
  </button>
</template>
