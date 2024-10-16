import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(true)

  const startFetch = async () => {
    loading.value = true
    try {
      const response = await fetch(url)
      if (!response.ok) {
        error.value = 'HTTP ERROR , TRY AGAIN LATER'
        throw new Error('HTTP error occured')
      }

      data.value = await response.json()
    } catch (error) {
      console.log('Error Message', error.message)

      error.value = error.message
    } finally {
      loading.value = false
    }
  }

  startFetch()

  return [data, error, loading]
}
