<template>
  <div class="flex px-4 py-3 justify-between items-center mt-3">
    <a class="text-gray-darkish" href="#" target="_blank">
      Add a Logo here
    </a>
    <span class="text-gray-darkish">Version {{ version }}</span>
  </div>
</template>

<script>
import { ref } from 'vue'
import { version } from '../../package.json'

export default {

  setup() {
    return {
      version: ref(version),
    }
  },
}
</script>
