<template>
  <div>
    <PageHeader
      eyebrow="About"
      title="Care that starts with"
      accent=" listening."
      :subtitle="`Bliss Mind is the practice of ${provider.name}, ${provider.credentials} — virtual psychiatric care for adults across ${practice.state}.`"
    />

    <!-- ================= Provider ================= -->
    <section class="relative isolate overflow-hidden px-6 py-16 md:py-28">
      <BlobField palette="mixed" class="opacity-40" />

      <div
        class="relative mx-auto grid max-w-5xl items-start gap-14 md:grid-cols-12"
      >
        <div v-reveal class="md:col-span-5">
          <div class="glass sticky top-28 rounded-[2.5rem] p-8 text-center">
            <div
              class="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-sage-800 font-display text-5xl text-linen"
              aria-hidden="true"
            >
              JU
            </div>
            <h2 class="mt-6 font-display text-3xl font-medium text-ink">
              {{ provider.name }}
            </h2>
            <p
              class="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-sage-600"
            >
              {{ provider.role }}
            </p>

            <ul class="mt-7 space-y-3 text-left">
              <li
                v-for="q in provider.qualifications"
                :key="q"
                class="flex items-start gap-3 text-sm text-ink-soft"
              >
                <svg
                  class="mt-0.5 h-4 w-4 shrink-0 text-sage-500"
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
                {{ q }}
              </li>
            </ul>

            <PillLink to="/contact" class="mt-8 w-full" arrow>
              Book a free consult
            </PillLink>
          </div>
        </div>

        <div class="md:col-span-7">
          <span
            v-reveal
            class="inline-flex items-center gap-2 rounded-full border border-sage-200/70 bg-sage-100/70 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sage-700"
          >
            <span
              class="h-1.5 w-1.5 rounded-full bg-clay-400"
              aria-hidden="true"
            ></span>
            Our approach
          </span>

          <h2
            v-reveal="60"
            class="mt-5 font-display text-4xl font-medium leading-[1.1] text-ink md:text-5xl"
          >
            Mental health is not a luxury.
          </h2>

          <div
            class="mt-7 space-y-5 text-base leading-relaxed text-ink-soft md:text-lg"
          >
            <p
              v-for="(para, i) in provider.bio"
              :key="i"
              v-reveal="100 + i * 60"
            >
              {{ para }}
            </p>
          </div>

          <div
            v-reveal="240"
            class="mt-10 rounded-3xl border border-sand bg-shell p-7"
          >
            <h3
              class="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sage-600"
            >
              Where we practice
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-ink-soft">
              {{ practice.locationNote }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= Values ================= -->
    <section class="bg-shell px-6 py-16 md:py-28">
      <div class="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What guides the work"
          title="Four things that shape"
          accent=" every appointment."
        />

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <BaseCard
            v-for="(value, i) in values"
            :key="value.title"
            v-reveal="i * 80"
            tone="white"
          >
            <div
              class="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-50 text-sage-700 md:mb-5 md:h-12 md:w-12"
            >
              <AppIcon :name="value.icon" />
            </div>
            <h3 class="font-display text-xl font-medium text-ink md:text-2xl">
              {{ value.title }}
            </h3>
            <p
              class="mt-2 text-[0.8rem] leading-relaxed text-ink-soft md:mt-2.5 md:text-sm"
            >
              {{ value.desc }}
            </p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="px-6 py-16 md:py-28">
      <div class="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Good to know" title="Questions, answered." />
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <CtaBanner
      title="Ready when you are."
      text="The first step is a free 15-minute conversation. Nothing more."
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
import PageHeader from "../components/PageHeader.vue";
import PillLink from "../components/PillLink.vue";
import SectionHeading from "../components/SectionHeading.vue";
import { provider, practice, faqs } from "../data/site.js";

const values = [
  {
    icon: "heart",
    title: "Empathy first",
    desc: "You are a person with a story, not a checklist of symptoms. That is where every appointment starts.",
  },
  {
    icon: "flask",
    title: "Evidence-based",
    desc: "Treatment grounded in current clinical research, explained in plain language so you can make real decisions.",
  },
  {
    icon: "lock",
    title: "Confidential",
    desc: "What you share is protected. Privacy is not a policy page here, it is how the practice runs.",
  },
  {
    icon: "sprout",
    title: "Unhurried",
    desc: "Progress at a pace that suits you, with plans that adjust as your needs change.",
  },
];
</script>
