<template>
  <div>
    <PageHeader
      eyebrow="Services"
      title="Psychiatric care,"
      accent=" built around you."
      subtitle="Evaluation, medication management and ongoing support, delivered virtually at a pace that works for your life."
    />

    <!-- ================= Conditions ================= -->
    <section class="relative isolate overflow-hidden px-6 py-16 md:py-28">
      <BlobField palette="cool" class="opacity-40" />

      <div class="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What we treat"
          title="Seven areas of"
          accent=" focused care."
          subtitle="If your concern is not listed, the free consultation is still the right place to start."
        />

        <div class="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-3">
          <BaseCard
            v-for="(condition, i) in conditions"
            :key="condition.name"
            v-reveal="i * 70"
            tone="glass"
          >
            <div
              class="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 text-sage-700 md:mb-5 md:h-12 md:w-12"
            >
              <AppIcon :name="condition.icon" />
            </div>
            <h3 class="font-display text-xl font-medium text-ink md:text-2xl">
              {{ condition.name }}
            </h3>
            <p
              class="mt-2 text-[0.8rem] leading-relaxed text-ink-soft md:mt-2.5 md:text-sm"
            >
              {{ condition.desc }}
            </p>
          </BaseCard>

          <div
            v-reveal="conditions.length * 70"
            class="flex flex-col justify-center rounded-3xl border border-dashed border-sage-300 bg-sage-50/60 p-8 text-center"
          >
            <p class="font-display text-2xl font-medium text-ink">
              Something else?
            </p>
            <p
              class="mt-2 text-[0.8rem] leading-relaxed text-ink-soft md:mt-2.5 md:text-sm"
            >
              Bring it to the free consult. We will tell you honestly whether we
              are the right fit, or point you somewhere that is.
            </p>
            <PillLink to="/contact" variant="ghost" class="mt-5" arrow>
              Book a consult
            </PillLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= Care approach ================= -->
    <section class="bg-shell px-6 py-16 md:py-28">
      <div class="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How care works"
          title="Three parts to"
          accent=" your treatment."
        />

        <div class="grid gap-6 md:grid-cols-3">
          <BaseCard
            v-for="(item, i) in careApproach"
            :key="item.title"
            v-reveal="i * 90"
            tone="white"
          >
            <div
              class="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-50 text-sage-700 md:mb-5 md:h-12 md:w-12"
            >
              <AppIcon :name="item.icon" />
            </div>
            <h3 class="font-display text-xl font-medium text-ink md:text-2xl">
              {{ item.title }}
            </h3>
            <p
              class="mt-2 text-[0.8rem] leading-relaxed text-ink-soft md:mt-2.5 md:text-sm"
            >
              {{ item.desc }}
            </p>
          </BaseCard>
        </div>

        <div
          v-reveal
          class="mx-auto mt-12 max-w-3xl rounded-3xl border border-sand bg-linen p-7 text-center"
        >
          <p class="text-sm leading-relaxed text-ink-soft">
            <strong class="font-semibold text-ink">Fully virtual.</strong>
            {{ practice.locationNote }}
          </p>
        </div>
      </div>
    </section>

    <!-- ================= Process ================= -->
    <section class="px-6 py-16 md:py-28">
      <div class="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Getting started"
          title="From first click to"
          accent=" first session."
        />

        <ol class="relative grid gap-10 md:grid-cols-4 md:gap-6">
          <div
            class="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-sage-300 to-transparent md:block"
            aria-hidden="true"
          ></div>

          <li
            v-for="(step, i) in steps"
            :key="step.title"
            v-reveal="i * 100"
            class="relative text-center md:text-left"
          >
            <div
              class="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-sage-200 bg-linen font-display text-2xl text-sage-700 shadow-soft md:mx-0"
            >
              {{ i + 1 }}
            </div>
            <h3 class="mt-5 font-display text-2xl font-medium text-ink">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">
              {{ step.desc }}
            </p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ================= Pricing ================= -->
    <section
      v-if="pricing.visible"
      class="relative isolate overflow-hidden bg-shell px-6 py-16 md:py-28"
    >
      <BlobField palette="warm" class="opacity-40" />
      <div class="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Fees"
          title="Clear pricing,"
          accent=" from the start."
          subtitle="The first conversation costs nothing. After that, you always know the rate before you book."
        />
        <PricingCards />
      </div>
    </section>

    <CtaBanner
      title="Start with fifteen free minutes."
      text="No cost, no commitment. Just a conversation about what is going on and what might help."
      :note="practice.locationNote"
    />
  </div>
</template>

<script setup>
import AppIcon from "../components/AppIcon.vue";
import BaseCard from "../components/BaseCard.vue";
import BlobField from "../components/BlobField.vue";
import CtaBanner from "../components/CtaBanner.vue";
import PageHeader from "../components/PageHeader.vue";
import PillLink from "../components/PillLink.vue";
import PricingCards from "../components/PricingCards.vue";
import SectionHeading from "../components/SectionHeading.vue";
import {
  conditions,
  careApproach,
  steps,
  pricing,
  practice,
} from "../data/site.js";
</script>
