<script setup>
import ButtonCustom from './ButtonCustom.vue'
import SectionedCard from './SectionedCard.vue'

const props = defineProps({
  title: String,
  status: String
})

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['cancelled'])
</script>

<template>
  <SectionedCard
    ><div class="flex justify-between">
      <div class="flex gap-4">
        <div>{{ props.title }}</div>
        <div>{{ props.status }}</div>
      </div>
      <ButtonCustom
        size="small"
        variant="danger"
        @click="$emit('cancelled')"
        >Cancel
      </ButtonCustom>
    </div></SectionedCard
  >
</template>
