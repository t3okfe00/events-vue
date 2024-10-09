<script setup>
import BookingItem from './components/BookingItem.vue'
import EventCard from './components/EventCard.vue'
import LoadingEventCard from './components/LoadingEventCard.vue'
import LoadingBookingEvent from './components/LoadingBookingEvent.vue'
import { ref, onMounted } from 'vue'

const events = ref([])
const bookedEvents = ref([])
const eventsLoading = ref(false)
const bookedEventsLoading = ref(false)

onMounted(() => {
  fetchBookedEvents(), fetchEvents()
})

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

const fetchBookedEvents = async () => {
  bookedEventsLoading.value = true
  const response = await fetch('http://localhost:5000/bookings')
  const data = await response.json()
  console.log('Fetched data: ', data)
  bookedEvents.value = data
  bookedEventsLoading.value = false
}

const handleRegisterEvent = async (event) => {
  console.log('Sending Register to server')
  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title
  }
  await fetch('http://localhost:5000/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...newBooking,
      status: 'confirmed'
    })
  })
}
</script>

<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>

    <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <template v-if="!eventsLoading">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :title="event.title"
          :when="event.when"
          :description="event.description"
          :handleRegisterButtonClick="() => handleRegisterEvent(event)"
        />
      </template>
      <template v-else>
        <LoadingEventCard
          v-for="i in 4"
          :key="i"
        />
      </template>
    </section>
    <h1 class="text-2xl font-medium">Booked Events</h1>
    <h2
      v-if="bookedEventsLoading"
      class="text2-xl font-medium"
    >
      <LoadingBookingEvent
        v-for="i in 3"
        :key="i"
      ></LoadingBookingEvent>
    </h2>

    <section
      class="grid grid-cols-1 gap-3"
      v-else
    >
      <BookingItem
        v-for="booked in bookedEvents"
        :key="booked.id"
        :title="booked.eventTitle"
      ></BookingItem>
    </section>
  </main>
</template>
