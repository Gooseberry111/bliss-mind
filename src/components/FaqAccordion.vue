<template>
  <div class="mx-auto max-w-3xl divide-y divide-sage-200/70">
    <div v-for="(faq, i) in items" :key="faq.q" v-reveal="i * 60">
      <h3>
        <button
          type="button"
          class="flex w-full items-center justify-between gap-6 py-6 text-left"
          :aria-expanded="open === i"
          :aria-controls="`faq-panel-${i}`"
          @click="toggle(i)"
        >
          <span
            class="font-display text-xl font-medium text-ink md:text-2xl"
            :class="open === i && 'text-sage-700'"
          >
            {{ faq.q }}
          </span>
          <span
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sage-200 bg-white/70 transition-all duration-300"
            :class="open === i ? 'rotate-45 border-sage-500 bg-sage-50' : ''"
            aria-hidden="true"
          >
            <svg
              class="h-4 w-4 text-sage-700"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
            >
              <path d="M8 3v10M3 8h10" stroke-linecap="round" />
            </svg>
          </span>
        </button>
      </h3>

      <!--
        Height is animated via a grid-rows trick so the panel can size to its
        content without a hard-coded max-height.
      -->
      <div
        :id="`faq-panel-${i}`"
        class="grid transition-all duration-500 ease-out"
        :class="
          open === i
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        "
      >
        <div class="overflow-hidden">
          <p
            class="pb-7 pr-14 text-sm leading-relaxed text-ink-soft md:text-base"
          >
            {{ faq.a }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  items: { type: Array, required: true },
});

// Accordion: opening one closes the others. Click an open item to close it.
const open = ref(0);
const toggle = (i) => (open.value = open.value === i ? -1 : i);
</script>
