<template>
  <component
    :is="href ? 'a' : 'RouterLink'"
    :to="href ? undefined : to"
    :href="href || undefined"
    :class="[base, sizes[size], variants[variant]]"
  >
    <span class="relative z-10 flex items-center justify-center gap-2">
      <slot />
      <svg
        v-if="arrow"
        class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <path d="M4 10h11m0 0-4-4m4 4-4 4" stroke-linecap="round" />
      </svg>
    </span>
  </component>
</template>

<script setup>
defineProps({
  to: { type: String, default: "" },
  href: { type: String, default: "" },
  arrow: { type: Boolean, default: false },
  variant: {
    type: String,
    default: "primary",
    validator: (v) =>
      ["primary", "clay", "outline", "outlineLight", "light", "ghost"].includes(
        v,
      ),
  },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },
});

const base =
  "group relative inline-flex items-center justify-center rounded-full font-semibold text-center " +
  "transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0";

const sizes = {
  sm: "text-sm px-5 py-2.5",
  md: "text-sm px-7 py-3.5",
  lg: "text-base px-9 py-4",
};

const variants = {
  primary:
    "bg-sage-800 text-linen hover:bg-sage-900 shadow-soft hover:shadow-lift",
  clay: "bg-clay-600 text-white hover:bg-clay-700 shadow-soft hover:shadow-lift",
  outline:
    "border border-sage-300 text-sage-800 hover:border-sage-600 hover:bg-sage-50",
  // For use on the dark sage panels, where `outline` would be dark-on-dark.
  outlineLight:
    "border border-white/30 text-linen hover:border-white/60 hover:bg-white/10",
  light: "bg-linen text-sage-900 hover:bg-white shadow-soft hover:shadow-lift",
  ghost: "text-sage-800 hover:bg-sage-50",
};
</script>
