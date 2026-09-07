<template>
  <div
    :class="[
      base,
      tones[tone],
      centered && 'text-center',
      interactive && hover,
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  tone: {
    type: String,
    default: "white",
    validator: (v) =>
      ["white", "glass", "glass-dark", "shell", "sage"].includes(v),
  },
  centered: { type: Boolean, default: false },
  interactive: { type: Boolean, default: true },
});

const base = "rounded-3xl p-7 md:p-8 transition-all duration-500 ease-out";

const hover = "hover:-translate-y-1.5 hover:shadow-lift";

const tones = {
  white: "bg-white/80 border border-sage-100 shadow-soft",
  glass: "glass rounded-3xl",
  "glass-dark": "glass-dark rounded-3xl text-linen",
  shell: "bg-shell border border-sand",
  sage: "bg-sage-800 text-linen border border-sage-700",
};
</script>
