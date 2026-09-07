<template>
  <section
    class="relative isolate flex min-h-[70vh] items-center overflow-hidden px-6 py-24"
  >
    <BlobField palette="mixed" />

    <div class="relative mx-auto max-w-xl text-center">
      <img
        :src="markSrc"
        alt=""
        width="320"
        height="326"
        class="animate-float-soft mx-auto mb-8 h-24 w-auto"
      />

      <p
        v-reveal
        class="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sage-600"
      >
        Error 404
      </p>

      <h1
        v-reveal="60"
        class="mt-5 font-display text-4xl font-medium leading-[1.1] text-ink md:text-6xl"
      >
        This page took a
        <em class="not-italic text-sage-500">quiet moment.</em>
      </h1>

      <p v-reveal="120" class="mt-6 text-base leading-relaxed text-ink-soft">
        The link may be out of date, or the page may have moved. Let's get you
        back to somewhere useful.
      </p>

      <div
        v-reveal="180"
        class="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"
      >
        <PillLink to="/" size="lg" arrow>Back to home</PillLink>
        <PillLink to="/contact" variant="outline" size="lg">
          Book a free consult
        </PillLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import BlobField from "../components/BlobField.vue";
import PillLink from "../components/PillLink.vue";
import markSrc from "../assets/brand/logo-mark.webp";
</script>
