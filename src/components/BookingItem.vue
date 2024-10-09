<script setup>
import ButtonCustom from './ButtonCustom.vue'
import SectionedCard from './SectionedCard.vue'

const props = defineProps({
  title: String
})
</script>

<template>
  <SectionedCard
    ><div class="flex justify-between">
      <div>{{ props.title }}</div>
      <ButtonCustom
        size="small"
        variant="danger"
        @click="() => console.log('You are click the delete but')"
        >Cancel
      </ButtonCustom>
    </div></SectionedCard
  >
</template>
