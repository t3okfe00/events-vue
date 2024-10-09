<script setup>
import EventCard from '@/components/EventCard.vue'
</script>

<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <EventCard
        v-for="i in 8"
        :key="i"
        title="Vue Conference"
        when="10/09/2024"
        description="One of the most amazing developer meetings in Europe!"
        @register="console.log('register run!')"
        @hello="console.log('hello run!')"
      />
    </section>
    <h2 class="text2-xl font-medium">Your bookings</h2>
  </main>
</template>
