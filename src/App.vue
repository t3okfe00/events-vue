<script setup>
import SectionedCard from './components/SectionedCard.vue'
import BookingItem from './components/BookingItem.vue'
import EventCard from './components/EventCard.vue'
import { ref, onMounted } from 'vue'

const events = ref([])
const eventsLoading = ref(false)

onMounted(() => fetchEvents())

const fetchEvents = async () => {
  eventsLoading.value = true
  try {
    const response = await fetch('http://localhost:5000/events')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    events.value = data
  } finally {
    eventsLoading.value = false
  }
}
</script>

<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>

    <section
      class="grid grid-cols-1 sm:grid-cols-2 gap-4"
      v-if="!eventsLoading"
    >
      <EventCard
        v-for="event in events"
        :key="event.id"
        :title="event.title"
        :when="event.when"
        :description="event.description"
        @register="console.log('register run!')"
      />
    </section>
    <section v-else>Loading Events..</section>
    <h2 class="text2-xl font-medium">Your bookings</h2>

    <SectionedCard title="Java Conference"></SectionedCard>

    <section class="grid grid-cols-1 gap-3">
      <BookingItem
        v-for="i in 3"
        :key="i"
      ></BookingItem>
    </section>
  </main>
</template>
