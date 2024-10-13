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

const findBookingIndexById = (id) => bookedEvents.value.findIndex((booking) => booking.id === id)

const handleRegisterBooking = async (event) => {
  if (bookedEvents.value.some((booking) => booking.eventId === event.id && booking.userId === 1)) {
    alert('You are already registered to this event')
    return
  }
  console.log('Sending Register to server')

  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending'
  }

  bookedEvents.value.push(newBooking)

  try {
    const response = await fetch('http://localhost:5000/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...newBooking,
        status: 'confirmed'
      })
    })
    if (response.ok) {
      const index = findBookingIndexById(newBooking.id)
      bookedEvents.value[index] = await response.json()
    } else {
      throw new Error('Failed to create a new booking')
    }
  } catch (error) {
    // Handle the errors
    console.error('Failed to register for an event:', error)
    bookedEvents.value = bookedEvents.value.fill((booking) => booking.id !== newBooking.id)
  }
}

const handleCancelBooking = async (bookingId) => {
  const index = findBookingIndexById(bookingId)
  // store the booking in case cancelation error happens
  const bookingToCancel = bookedEvents.value[index]
  bookedEvents.value.splice(index, 1)

  try {
    const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Error cancelling the booking')
    }
  } catch (error) {
    console.error('Failed to cancel', error)
    bookedEvents.value.splice(index, 0, bookingToCancel)
  }
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
          :handleRegisterButtonClick="() => handleRegisterBooking(event)"
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
        :status="booked.status"
        :id="booked.id"
        @cancelled="handleCancelBooking(booked.id)"
      ></BookingItem>
    </section>
  </main>
</template>
