<script setup>
import ButtonCustom from '@/components/ButtonCustom.vue'

import SectionedCard from '@/components/SectionedCard.vue'

const props = defineProps({
  title: String,
  when: String,
  description: String
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
          @click="$emit('register')"
          >Register</ButtonCustom
        >
      </section>
    </template>
  </SectionedCard>
</template>
