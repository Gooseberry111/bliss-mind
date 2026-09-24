<template>
  <div class="bg-sage-900 text-sage-100">
    <div
      class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 text-center"
    >
      <p class="text-xs font-medium">{{ announcement.text }}</p>
      <span class="hidden text-sage-500 sm:inline" aria-hidden="true">·</span>
      <RouterLink
        :to="announcement.to"
        class="link-underline text-xs font-semibold text-clay-200 transition-colors hover:text-white"
      >
        {{ announcement.linkLabel }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { announcement } from "../data/site.js";
</script>
