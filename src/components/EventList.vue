<script setup>
import EventCard from '@/components/EventCard.vue'
import LoadingEventCard from '@/components/LoadingEventCard.vue'
import SectionedCard from './SectionedCard.vue'
import ButtonCustom from './ButtonCustom.vue'
import { ref, onMounted } from 'vue'

const events = ref([])
const loading = ref(false)
const error = ref(false)

defineEmits(['register'])

onMounted(() => fetchEvents())

const fetchEvents = async () => {
  console.log('Fetch events run!')
  error.value = false
  loading.value = true
  try {
    const response = await fetch('http://localhost:5000/events')
    events.value = await response.json()
  } catch (e) {
    console.log('Error happened', e)
    error.value = true
    console.log('ERROR STATE', error.value)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <template v-if="error">
    <SectionedCard>
      <div class="space-y-4 items-center flex flex-col">
        <div class="text-red-500">Could not load the events at the moment..Please try again</div>
        <ButtonCustom
          @click="fetchEvents"
          variant="primary"
          rounded
        >
          Retry Now</ButtonCustom
        >
      </div>
    </SectionedCard>
  </template>
  <template v-else>
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <template v-if="!loading">
        <template v-if="events.length">
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
          <div>No Events yet</div>
        </template>
      </template>
      <template v-else>
        <LoadingEventCard
          v-for="i in 4"
          :key="i"
        />
      </template></section
  ></template>
</template>
