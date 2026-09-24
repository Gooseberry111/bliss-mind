<template>
  <div
    class="ticker relative overflow-hidden bg-sage-900 text-sage-100"
    role="region"
    aria-label="Practice announcements"
  >
    <!-- Soft fade at both ends so items slide in and out rather than clipping. -->
    <div
      class="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-sage-900 to-transparent"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-sage-900 to-transparent"
      aria-hidden="true"
    ></div>

    <div class="ticker-track">
      <!--
        The list is rendered twice: the track scrolls exactly -50%, so the
        second copy is in place the moment the first scrolls out. The duplicate
        is hidden from assistive tech.
      -->
      <ul
        v-for="copy in 2"
        :key="copy"
        class="flex shrink-0 items-center"
        :aria-hidden="copy === 2 ? 'true' : undefined"
      >
        <li
          v-for="item in announcements"
          :key="item"
          class="flex items-center whitespace-nowrap px-8 py-2.5"
        >
          <span
            class="text-[0.7rem] font-semibold uppercase tracking-[0.18em] md:text-xs"
          >
            {{ item }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { announcements } from "../data/site.js";
</script>
