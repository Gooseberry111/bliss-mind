<template>
  <div>
    <!-- ================= Hero ================= -->
    <section
      class="relative isolate overflow-hidden px-6 pb-20 pt-16 md:pb-28 md:pt-24"
    >
      <BlobField palette="mixed" />

      <div
        class="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12 lg:gap-10"
      >
        <!-- Copy -->
        <div class="lg:col-span-7">
          <span
            v-reveal
            class="inline-flex items-center gap-2.5 rounded-full border border-sage-200/80 bg-white/60 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-sage-700 backdrop-blur"
          >
            <span class="relative flex h-2 w-2" aria-hidden="true">
              <span
                class="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-clay-400"
              ></span>
              <span
                class="relative inline-flex h-2 w-2 rounded-full bg-clay-400"
              ></span>
            </span>
            Accepting new patients in {{ practice.state }}
          </span>

          <h1
            v-reveal="80"
            class="mt-7 font-display text-[2.75rem] font-medium leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
          >
            A calmer mind starts with
            <em class="not-italic text-sage-500">being heard.</em>
          </h1>

          <p
            v-reveal="160"
            class="mt-7 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Virtual psychiatric care across {{ practice.state }} with
            {{ provider.name }}, {{ provider.credentials }}. Start with a free
            15-minute consultation — no cost, no commitment, just a
            conversation.
          </p>

          <div
            v-reveal="230"
            class="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <PillLink to="/contact" size="lg" arrow
              >Book your free consult</PillLink
            >
            <PillLink to="/services" variant="outline" size="lg">
              What we treat
            </PillLink>
          </div>

          <!-- Trust chips -->
          <ul
            v-reveal="300"
            class="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-medium text-ink-muted"
          >
            <li
              v-for="chip in chips"
              :key="chip"
              class="flex items-center gap-2"
            >
              <svg
                class="h-4 w-4 text-sage-500"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path
                  d="m3 8.5 3.2 3.2L13 5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ chip }}
            </li>
          </ul>
        </div>

        <!-- Logo panel -->
        <div v-reveal="140" class="lg:col-span-5">
          <div class="relative mx-auto max-w-sm">
            <div class="glass rounded-[2.5rem] p-9 text-center">
              <img
                :src="logoSrc"
                :alt="`${site.name} — ${site.tagline}`"
                width="900"
                height="909"
                fetchpriority="high"
                decoding="async"
                class="animate-float-soft mx-auto w-full max-w-[16rem]"
              />
            </div>

            <!-- Floating badge -->
            <div
              class="absolute -bottom-5 -left-3 rounded-2xl bg-sage-900 px-5 py-4 text-left shadow-lift sm:-left-6"
            >
              <p class="font-display text-3xl leading-none text-linen">Free</p>
              <p
                class="mt-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-sage-300"
              >
                15-minute consult
              </p>
            </div>

            <div
              class="absolute -right-2 -top-4 rounded-2xl border border-sand bg-clay-50 px-4 py-3 shadow-soft sm:-right-5"
            >
              <p
                class="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-clay-600"
              >
                100% virtual
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= Conditions ================= -->
    <section class="relative px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What we treat"
          title="Support for what you're"
          accent=" actually carrying."
          subtitle="Care for the concerns that bring most people to a psychiatric practice — and a free consult if you are not sure where yours fits."
        />

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <BaseCard
            v-for="(condition, i) in conditions"
            :key="condition.name"
            v-reveal="i * 70"
            tone="white"
          >
            <div
              class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-50 text-sage-700"
            >
              <AppIcon :name="condition.icon" />
            </div>
            <h3 class="font-display text-2xl font-medium text-ink">
              {{ condition.name }}
            </h3>
            <p class="mt-2.5 text-sm leading-relaxed text-ink-soft">
              {{ condition.desc }}
            </p>
          </BaseCard>

          <!-- Eighth tile completes the grid and catches everyone else -->
          <RouterLink
            v-reveal="conditions.length * 70"
            to="/contact"
            class="group flex flex-col justify-between rounded-3xl bg-sage-900 p-7 text-linen transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift md:p-8"
          >
            <div>
              <div
                class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-clay-200"
              >
                <AppIcon name="spark" />
              </div>
              <h3 class="font-display text-2xl font-medium">Not sure?</h3>
              <p class="mt-2.5 text-sm leading-relaxed text-sage-200">
                You don't need a diagnosis to reach out. Book the free consult
                and we'll work out where to start together.
              </p>
            </div>
            <span
              class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-clay-200"
            >
              Start here
              <svg
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
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ================= Meet the provider ================= -->
    <section
      class="relative isolate overflow-hidden bg-shell px-6 py-20 md:py-28"
    >
      <div class="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-2">
        <div v-reveal class="relative mx-auto w-full max-w-sm">
          <div
            class="aspect-4/5 overflow-hidden rounded-[2.5rem] border border-sand bg-gradient-to-br from-sage-100 via-linen to-clay-50 shadow-soft"
          >
            <div
              class="flex h-full flex-col items-center justify-center gap-5 p-8"
            >
              <div
                class="flex h-28 w-28 items-center justify-center rounded-full bg-sage-800 font-display text-4xl text-linen"
                aria-hidden="true"
              >
                JU
              </div>
              <p class="text-center font-display text-2xl text-ink">
                {{ provider.name }}
              </p>
              <p
                class="text-center text-[0.65rem] font-bold uppercase tracking-[0.18em] text-sage-600"
              >
                {{ provider.credentials }}
              </p>
            </div>
          </div>
          <img
            :src="markSrc"
            alt=""
            width="320"
            height="326"
            class="animate-float-soft absolute -bottom-6 -right-4 h-24 w-auto"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="Meet your provider"
            :title="provider.name"
            align="left"
            spacing="mb-0"
            class="max-w-none"
          />
          <p
            class="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-sage-600"
          >
            {{ provider.role }}
          </p>
          <p
            v-reveal="80"
            class="mt-6 text-base leading-relaxed text-ink-soft md:text-lg"
          >
            {{ provider.bio[0] }}
          </p>
          <PillLink
            v-reveal="160"
            to="/about"
            variant="outline"
            class="mt-8"
            arrow
          >
            More about {{ provider.name.split(" ")[1] }}
          </PillLink>
        </div>
      </div>
    </section>

    <!-- ================= How it works ================= -->
    <section class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, and the first one"
          accent=" is free."
          subtitle="No paperwork marathon, no waiting to find out whether this is right for you."
        />

        <ol class="relative grid gap-10 md:grid-cols-4 md:gap-6">
          <!-- Connecting line on desktop -->
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
      class="relative isolate overflow-hidden px-6 py-20 md:py-28"
    >
      <BlobField palette="warm" class="opacity-50" />
      <div class="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Simple pricing"
          title="No surprises,"
          accent=" ever."
          subtitle="Self-pay, clearly priced. You will always know what a session costs before you book it."
        />
        <PricingCards />
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="bg-shell px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Questions"
          title="The things people ask"
          accent=" first."
        />
        <FaqAccordion :items="faqs.slice(0, 4)" />
        <p v-reveal class="mt-10 text-center text-sm text-ink-soft">
          Still wondering about something?
          <RouterLink
            to="/contact"
            class="link-underline font-semibold text-sage-700"
          >
            Ask us directly
          </RouterLink>
        </p>
      </div>
    </section>

    <CtaBanner
      title="You don't have to work it out alone."
      text="Fifteen minutes, no cost, no pressure. Just a conversation about what's going on and what might help."
      label="Book your free consult"
      secondary-label="See what we treat"
      secondary-to="/services"
      :note="practice.locationNote"
    />
  </div>
</template>

<script setup>
import AppIcon from "../components/AppIcon.vue";
import BaseCard from "../components/BaseCard.vue";
import BlobField from "../components/BlobField.vue";
import CtaBanner from "../components/CtaBanner.vue";
import FaqAccordion from "../components/FaqAccordion.vue";
import PillLink from "../components/PillLink.vue";
import PricingCards from "../components/PricingCards.vue";
import SectionHeading from "../components/SectionHeading.vue";
import logoSrc from "../assets/brand/logo.webp";
import markSrc from "../assets/brand/logo-mark.webp";
import {
  site,
  provider,
  practice,
  conditions,
  steps,
  pricing,
  faqs,
} from "../data/site.js";

const chips = [
  "Free 15-minute consult",
  "100% virtual",
  `Licensed in ${practice.state}`,
  "Self-pay, clearly priced",
];
</script>
