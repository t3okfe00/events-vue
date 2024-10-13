<script setup>
import EventCard from '@/components/EventCard.vue'
import LoadingEventCard from '@/components/LoadingEventCard.vue'

import { ref, onMounted } from 'vue'
const events = ref([])
const loading = ref(false)

defineEmits(['register'])

onMounted(() => fetchEvents())

const fetchEvents = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:5000/events')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    events.value = data
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <template v-if="!loading">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :title="event.title"
        :when="event.when"
        :description="event.description"
        @register="$emit('register', event)"
      />
    </template>
    <template v-else>
      <LoadingEventCard
        v-for="i in 4"
        :key="i"
      />
    </template>
  </section>
</template>
