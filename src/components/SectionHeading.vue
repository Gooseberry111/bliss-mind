<template>
  <div
    :class="[
      align === 'center' ? 'text-center mx-auto' : '',
      'max-w-2xl',
      spacing,
    ]"
  >
    <span
      v-if="eyebrow"
      v-reveal
      :class="[
        'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em]',
        tone === 'light'
          ? 'bg-white/10 text-sage-200 border border-white/15'
          : 'bg-sage-100/70 text-sage-700 border border-sage-200/70',
      ]"
    >
      <span
        class="h-1.5 w-1.5 rounded-full bg-clay-400"
        aria-hidden="true"
      ></span>
      {{ eyebrow }}
    </span>

    <h2
      v-reveal="60"
      :class="[
        'font-display font-medium leading-[1.1] mt-5',
        sizes[size],
        tone === 'light' ? 'text-linen' : 'text-ink',
      ]"
    >
      {{ title }}
      <em v-if="accent" class="not-italic text-sage-500">{{ accent }}</em>
    </h2>

    <p
      v-if="subtitle"
      v-reveal="120"
      :class="[
        'mt-5 text-base leading-relaxed md:text-lg',
        tone === 'light' ? 'text-sage-200' : 'text-ink-soft',
      ]"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  accent: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  eyebrow: { type: String, default: "" },
  align: { type: String, default: "center" },
  tone: { type: String, default: "dark" },
  spacing: { type: String, default: "mb-10 md:mb-14" },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["md", "lg"].includes(v),
  },
});

const sizes = {
  md: "text-4xl md:text-5xl",
  lg: "text-4xl md:text-6xl",
};
</script>
