<template>
  <section class="px-6 py-20 md:py-24">
    <div
      class="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-sage-900 px-6 py-16 text-center md:px-16 md:py-20"
    >
      <BlobField palette="mixed" class="opacity-40" />

      <div class="relative">
        <span
          class="animate-float-soft mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-linen/95 shadow-soft"
        >
          <img
            :src="markSrc"
            alt=""
            width="320"
            height="326"
            class="h-14 w-auto"
          />
        </span>

        <h2
          v-reveal
          class="mx-auto max-w-2xl font-display text-3xl font-medium leading-tight text-linen md:text-5xl"
        >
          {{ title }}
        </h2>

        <p
          v-reveal="80"
          class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-sage-200 md:text-lg"
        >
          {{ text }}
        </p>

        <div
          v-reveal="140"
          class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <PillLink :to="to" variant="light" size="lg" arrow>{{
            label
          }}</PillLink>
          <PillLink
            v-if="secondaryLabel"
            :to="secondaryTo"
            variant="outlineLight"
            size="lg"
          >
            {{ secondaryLabel }}
          </PillLink>
        </div>

        <p v-if="note" class="mt-6 text-xs text-sage-200">{{ note }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import BlobField from "./BlobField.vue";
import PillLink from "./PillLink.vue";
import markSrc from "../assets/brand/logo-mark.webp";

defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
  label: { type: String, default: "Book your free consult" },
  to: { type: String, default: "/contact" },
  secondaryLabel: { type: String, default: "" },
  secondaryTo: { type: String, default: "/services" },
  note: { type: String, default: "" },
});
</script>
