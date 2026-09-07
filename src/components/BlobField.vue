<template>
  <div
    class="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <div
      v-for="(blob, i) in blobs"
      :key="i"
      class="blob animate-drift"
      :style="blob"
    ></div>
    <slot />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // "warm" leans clay/sand, "cool" leans sage/lilac, "mixed" uses both.
  palette: {
    type: String,
    default: "mixed",
    validator: (v) => ["warm", "cool", "mixed"].includes(v),
  },
});

const palettes = {
  warm: ["var(--color-clay-200)", "var(--color-sand)", "var(--color-clay-100)"],
  cool: [
    "var(--color-sage-300)",
    "var(--color-lilac-200)",
    "var(--color-sage-200)",
  ],
  mixed: [
    "var(--color-sage-300)",
    "var(--color-clay-200)",
    "var(--color-lilac-200)",
  ],
};

// Fixed positions rather than random, so the layout is stable between renders.
const layout = [
  { top: "-6rem", left: "-4rem", width: "26rem", height: "26rem", delay: "0s" },
  {
    top: "30%",
    right: "-6rem",
    width: "22rem",
    height: "22rem",
    delay: "-7s",
  },
  {
    bottom: "-8rem",
    left: "35%",
    width: "24rem",
    height: "24rem",
    delay: "-14s",
  },
];

const blobs = computed(() =>
  layout.map((pos, i) => ({
    ...pos,
    background: palettes[props.palette][i],
    animationDelay: pos.delay,
  })),
);
</script>
