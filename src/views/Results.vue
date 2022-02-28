<template>
  <div
    data-test-id="results-tab"
    class="flex flex-col bg-blue-light overflow-hidden mt-4 h-100 dark:bg-black"
  >
    <div class="flex flex-row">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="w-1/2 p-2 font-semibold text-xs capitalize rounded-t"
        :class="
          activeTab === tab
            ? 'bg-black text-gray-lightest dark:bg-black-shady'
            : 'text-gray-dark dark:text-gray'
        "
        @click.prevent="changeTab(tab)"
      >
        {{ tab }}
      </button>
    </div>

    <div class="sc p-2 bg-black dark:bg-black-shady">
      <pre
        v-if="code"
        v-highlightjs="code"
        class="overflow-auto bg-black dark:bg-black-shady h-100 language-plaintext"
      >
      <code ref="code" class="javascript bg-black dark:bg-black-shady px-2 break-word whitespace-pre-wrap overflow-x-hidden"></code>
      </pre>
      <pre v-else>
        <code>No code yet...</code>
      </pre>
    </div>
  </div>
</template>
<script>
import { headlessTypes } from '@/modules/code-generator/constants'

export default {
  name: 'ResultsTab',

  props: {
    repSteps: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      activeTab: headlessTypes.REPSTEPS,
      tabs: [headlessTypes.REPSTEPS],
    }
  },

  computed: {
    code: function() {
      return this.repSteps
    },
  },

  // mounted() {
  //   if (!this.options?.code?.showFirst) {
  //     this.activeTab = headlessTypes.REPSTEPS
  //     this.tabs = this.tabs.reverse()
  //   }

  //   this.$emit('update:tab', this.activeTab)
  // },

  methods: {
    changeTab(tab) {
      this.activeTab = tab
      this.$emit('update:tab', tab)
    },
  },
}
</script>

<style scoped>
pre::-webkit-scrollbar {
  height: 8px;
  width: 8px;
  margin-right: 10px;
  padding: 10px;
  background: transparent;
}

pre::-webkit-scrollbar-thumb {
  margin-right: 10px;
  padding: 10px;
  background: #e0e6ed;
  border-radius: 0.5rem;
}

pre::-webkit-scrollbar-corner {
  background: yellow;
}
</style>
