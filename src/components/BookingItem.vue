<script setup>
import ButtonCustom from './ButtonCustom.vue'
import SectionedCard from './SectionedCard.vue'
</script>

<template>
  <SectionedCard
    ><div class="flex justify-between">
      <div>Booking to Vue Conference</div>
      <ButtonCustom
        size="small"
        variant="danger"
        >Cancel
      </ButtonCustom>
    </div></SectionedCard
  >
</template>
