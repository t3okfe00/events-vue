<script setup>
import CustomCard from './CustomCard.vue'
</script>
<template>
  <CustomCard>
    <h3
      v-if="$slots.header"
      class="p-4 font-medium text-xl border-b border-gray-800"
    >
      <slot name="header"> </slot>
    </h3>

    <div
      v-if="$slots.default"
      :class="{ 'p-4': true, 'border border-gray-200': $slots.footer }"
    >
      <slot></slot>
    </div>
    <p v-if="$slots.footer">
      <slot name="footer"> </slot>
    </p>
  </CustomCard>
</template>
