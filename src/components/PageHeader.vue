<template>
  <section
    class="relative isolate overflow-hidden bg-sage-900 px-6 pb-20 pt-20 md:pb-24 md:pt-28"
  >
    <BlobField palette="cool" class="opacity-30" />

    <div class="relative mx-auto max-w-3xl text-center">
      <span
        v-if="eyebrow"
        v-reveal
        class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sage-200"
      >
        <span
          class="h-1.5 w-1.5 rounded-full bg-clay-300"
          aria-hidden="true"
        ></span>
        {{ eyebrow }}
      </span>

      <h1
        v-reveal="60"
        class="mt-6 font-display text-4xl font-medium leading-[1.08] text-linen md:text-6xl"
      >
        {{ title }}
        <em v-if="accent" class="not-italic text-sage-400">{{ accent }}</em>
      </h1>

      <p
        v-if="subtitle"
        v-reveal="120"
        class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-sage-200 md:text-lg"
      >
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>

<script setup>
import BlobField from "./BlobField.vue";

defineProps({
  title: { type: String, required: true },
  accent: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  eyebrow: { type: String, default: "" },
});
</script>
