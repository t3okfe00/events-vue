<script setup>
import ButtonCustom from './ButtonCustom.vue'

import SectionedCard from './SectionedCard.vue'

const props = defineProps({
  title: String,
  when: String,
  description: String,
  handleRegisterButtonClick: Function
})
</script>

<template>
  <SectionedCard>
    <template #header>
      <section class="flex justify-between">
        <div>{{ props.title }}</div>
        <div>{{ props.when }}</div>
      </section>
    </template>

    <template #default>
      {{ props.description }}
    </template>
    <template #footer
      ><section class="flex justify-end p-4">
        <ButtonCustom
          size="small"
          variant="primary"
          :onClick="handleRegisterButtonClick"
          >Register</ButtonCustom
        >
      </section>
    </template>
  </SectionedCard>
</template>
