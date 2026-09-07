<template>
  <!-- Scheduler embedded inline -->
  <div
    v-if="state === 'embed'"
    class="overflow-hidden rounded-3xl border border-sage-200 bg-white shadow-soft"
  >
    <iframe
      :src="booking.url"
      title="Appointment scheduling calendar"
      width="100%"
      height="620"
      loading="lazy"
      style="border: 0"
    ></iframe>
  </div>

  <!-- Scheduler opened in a new tab -->
  <div
    v-else-if="state === 'link'"
    class="rounded-3xl border border-sage-200 bg-white p-8 text-center shadow-soft"
  >
    <span
      class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sage-50 text-sage-700"
    >
      <AppIcon name="clock" size="lg" />
    </span>
    <h3 class="font-display text-2xl font-medium text-ink">
      See available times
    </h3>
    <p class="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
      Pick any open slot that suits you. You'll get an email confirmation with
      your video link.
    </p>
    <PillLink
      :href="booking.url"
      target="_blank"
      rel="noopener"
      class="mt-6"
      size="lg"
      arrow
    >
      Choose a time
    </PillLink>
  </div>

  <!-- No scheduler configured yet -->
  <div
    v-else
    class="rounded-3xl border border-dashed border-sage-300 bg-sage-50/60 p-8 text-center"
  >
    <span
      class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-sage-700"
    >
      <AppIcon name="clock" size="lg" />
    </span>
    <h3 class="font-display text-2xl font-medium text-ink">
      Online booking is coming soon
    </h3>
    <p class="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
      In the meantime, request a callback using the form, or reach out directly
      and we'll find a time that works.
    </p>
    <div
      class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
    >
      <PillLink :href="`mailto:${contact.email}`" variant="outline">
        {{ contact.email }}
      </PillLink>
      <PillLink :href="`tel:${phoneHref}`" variant="outline">
        {{ contact.phone }}
      </PillLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import AppIcon from "./AppIcon.vue";
import PillLink from "./PillLink.vue";
import { booking, contact } from "../data/site.js";

// Falls back to the "not configured" card whenever no URL is set, so the page
// can never render an empty or broken scheduler.
const state = computed(() => {
  if (!booking.url) return "unset";
  return booking.mode === "link" ? "link" : "embed";
});

const phoneHref = computed(() => contact.phone.replace(/[^+\d]/g, ""));
</script>
