<script setup>
import ButtonCustom from './ButtonCustom.vue'
import CustomCard from './CustomCard.vue'

const props = defineProps({
  title: String,
  when: String,
  description: String
})

function handleRegisterButtonClick() {
  console.log('Register button is being clicked!')
}

function handleCancelButtonClick() {
  console.log('Cancelling!')
}
</script>

<template>
  <CustomCard>
    <h3 class="p-4 font-medium text-xl border-b border-gray-200">{{ props.title }}</h3>
    <p class="p-4 border-b border-gray-200">{{ props.when }}</p>
    <p class="p-4">{{ props.description }}</p>
    <section class="flex justify-end p-4">
      <ButtonCustom
        size="medium"
        variant="primary"
        :onClick="handleRegisterButtonClick"
        >Register</ButtonCustom
      >
      <ButtonCustom
        variant="danger"
        :onClick="handleCancelButtonClick"
        >Cancel</ButtonCustom
      >
    </section>
  </CustomCard>
</template>
