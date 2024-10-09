<script setup>
import ButtonCustom from './ButtonCustom.vue'
const props = defineProps({
  title: String,
  when: String,
  description: String
})
</script>

<template>
  <div class="border border-gray-200 bg-white rounded-md">
    <h3 class="p-4 font-medium text-xl border-b border-gray-200">{{ props.title }}</h3>
    <p class="p-4 border-b border-gray-200">{{ props.when }}</p>
    <p class="p-4">{{ props.description }}</p>
    <section class="flex justify-end p-4">
      <ButtonCustom
        label="Register"
        @click="$emit('register')"
      ></ButtonCustom>
      <ButtonCustom
        @click="$emit('hello')"
        label="hello"
      ></ButtonCustom>
    </section>
  </div>
</template>
