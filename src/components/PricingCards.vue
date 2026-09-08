<template>
  <div v-if="pricing.visible">
    <div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 md:gap-8">
      <div
        v-for="(plan, i) in pricing.plans"
        :key="plan.name"
        v-reveal="i * 100"
        :class="[
          'relative flex flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1.5 md:p-10',
          plan.highlight
            ? 'bg-sage-900 text-linen shadow-lift'
            : 'border border-sage-200 bg-white/70 shadow-soft',
        ]"
      >
        <span
          v-if="plan.highlight"
          class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-clay-600 px-4 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white"
        >
          Start here
        </span>

        <p
          :class="[
            'text-[0.65rem] font-bold uppercase tracking-[0.2em]',
            plan.highlight ? 'text-sage-300' : 'text-sage-600',
          ]"
        >
          {{ plan.name }}
        </p>

        <p class="mt-5 flex items-baseline gap-2">
          <span
            :class="[
              'font-display text-5xl font-medium leading-none md:text-6xl',
              plan.highlight ? 'text-linen' : 'text-ink',
            ]"
          >
            {{ plan.price }}
          </span>
          <span
            :class="[
              'text-sm',
              plan.highlight ? 'text-sage-300' : 'text-ink-muted',
            ]"
          >
            {{ plan.unit }}
          </span>
        </p>

        <p
          :class="[
            'mt-5 text-sm leading-relaxed',
            plan.highlight ? 'text-sage-200' : 'text-ink-soft',
          ]"
        >
          {{ plan.desc }}
        </p>

        <ul class="mt-7 flex-1 space-y-3">
          <li
            v-for="item in plan.includes"
            :key="item"
            :class="[
              'flex items-start gap-3 text-sm',
              plan.highlight ? 'text-sage-100' : 'text-ink-soft',
            ]"
          >
            <svg
              :class="[
                'mt-0.5 h-4 w-4 shrink-0',
                plan.highlight ? 'text-clay-300' : 'text-sage-500',
              ]"
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
            {{ item }}
          </li>
        </ul>

        <PillLink
          to="/contact"
          :variant="plan.highlight ? 'light' : 'outline'"
          class="mt-8 w-full"
          arrow
        >
          {{ plan.cta }}
        </PillLink>

        <p
          v-if="plan.footnote"
          :class="[
            'mt-4 text-xs leading-relaxed',
            plan.highlight ? 'text-sage-300' : 'text-ink-muted',
          ]"
        >
          {{ plan.footnote }}
        </p>
      </div>
    </div>

    <p class="mt-8 text-center text-xs text-ink-muted">
      {{ pricing.currencyNote }}
    </p>
  </div>
</template>

<script setup>
import PillLink from "./PillLink.vue";
import { pricing } from "../data/site.js";
</script>
