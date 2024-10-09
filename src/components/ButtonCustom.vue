<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: String,
  variant: String,
  disabled: Boolean,
  onClick: Function
})

const handleClick = computed(() => {
  return (event) => {
    if (props.onClick) {
      props.onClick(event)
    }
  }
})

const buttonClasses = computed(() => {
  return [
    'border-2 border-gray-400 rounded-md text-sm font-medium px-3 py-1 hover:bg-gray-300',
    {
      'px-2 py-0.5 text-cs': props.size === 'small',
      'px-3 py-1 text-sm': props.size === 'medium',
      'px-4 py-2 text-base': props.size === 'large',
      'border-gray-400 text-gray-700 hover:bg-gray-100': props.variant === 'default',
      'border-green-500 bg-green-500 text-white hover:bg-green-600': props.variant === 'primary',
      'border-red-500 bg-red-500 text-white hover:bg-red-600': props.variant === 'danger',
      'opacity-50 cursor-not-allowed': props.disabled === 'true'
    }
  ]
})
</script>
<template>
  <button
    :class="buttonClasses"
    @click="handleClick"
  >
    <slot>OK</slot>
  </button>
</template>
