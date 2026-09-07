<template>
  <component
    :is="to ? 'RouterLink' : 'div'"
    :to="to"
    class="group inline-flex items-center gap-2.5"
    :aria-label="to ? `${site.name} — home` : null"
  >
    <span
      :class="[
        'inline-flex items-center justify-center rounded-full transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110',
        tone === 'light' ? 'bg-linen/95 p-1.5' : '',
      ]"
    >
      <img
        :src="markSrc"
        alt=""
        width="320"
        height="326"
        :class="['w-auto', markSize]"
      />
    </span>
    <span v-if="wordmark" class="flex flex-col leading-none">
      <span
        :class="[
          'font-display font-semibold tracking-tight',
          textSize,
          tone === 'light' ? 'text-linen' : 'text-ink',
        ]"
      >
        bliss mind
      </span>
      <span
        v-if="tagline"
        :class="[
          'mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.2em]',
          tone === 'light' ? 'text-sage-300' : 'text-ink-muted',
        ]"
      >
        Mindful living. Real support.
      </span>
    </span>
  </component>
</template>

<script setup>
import { computed } from "vue";
import markSrc from "../assets/brand/logo-mark.webp";
import { site } from "../data/site.js";

const props = defineProps({
  to: { type: String, default: "" },
  wordmark: { type: Boolean, default: true },
  tagline: { type: Boolean, default: false },
  tone: {
    type: String,
    default: "dark",
    validator: (v) => ["dark", "light"].includes(v),
  },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },
});

const markSize = computed(
  () => ({ sm: "h-8", md: "h-10", lg: "h-14" })[props.size],
);
const textSize = computed(
  () =>
    ({ sm: "text-xl", md: "text-2xl", lg: "text-3xl md:text-4xl" })[props.size],
);
</script>
