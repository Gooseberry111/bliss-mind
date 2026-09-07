<template>
  <footer
    class="relative isolate mt-auto overflow-hidden bg-sage-900 text-sage-200"
  >
    <BlobField palette="cool" class="opacity-20" />

    <div class="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <div class="grid gap-12 md:grid-cols-12">
        <!-- Brand -->
        <div class="md:col-span-5">
          <SiteLogo tone="light" tagline />
          <p class="mt-6 max-w-sm text-sm leading-relaxed text-sage-300">
            Virtual psychiatric care with {{ provider.name }},
            {{ provider.credentials }} — for adults across {{ practice.state }}.
          </p>
          <p
            class="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-sage-200"
          >
            <span class="relative flex h-2 w-2" aria-hidden="true">
              <span
                class="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-clay-300"
              ></span>
              <span
                class="relative inline-flex h-2 w-2 rounded-full bg-clay-400"
              ></span>
            </span>
            Accepting new patients
          </p>
        </div>

        <!-- Links -->
        <nav aria-label="Footer" class="md:col-span-3">
          <h2
            class="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sage-400"
          >
            Explore
          </h2>
          <ul class="mt-5 space-y-3 text-sm">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="link-underline text-sage-200 transition-colors hover:text-white"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Contact -->
        <div class="md:col-span-4">
          <h2
            class="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sage-400"
          >
            Get in touch
          </h2>
          <ul class="mt-5 space-y-3 text-sm">
            <li>
              <a
                :href="`mailto:${contact.email}`"
                class="link-underline transition-colors hover:text-white"
              >
                {{ contact.email }}
              </a>
            </li>
            <li>
              <a
                :href="`tel:${phoneHref}`"
                class="link-underline transition-colors hover:text-white"
              >
                {{ contact.phone }}
              </a>
            </li>
            <li class="text-sage-300">{{ contact.hours }}</li>
            <li class="text-sage-300">
              {{ practice.modality }} · {{ practice.state }}, USA
            </li>
          </ul>
        </div>
      </div>

      <!-- Crisis notice -->
      <div
        class="mt-14 rounded-2xl border border-clay-400/25 bg-clay-400/10 px-5 py-4 text-xs leading-relaxed text-sage-100"
      >
        <strong class="font-semibold text-clay-200">{{ crisis.note }}</strong>
        {{ crisis.line }}
      </div>

      <div
        class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-sage-400 sm:flex-row"
      >
        <p>© {{ year }} {{ site.name }}. All rights reserved.</p>
        <p>{{ provider.role }} · Licensed in {{ practice.state }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import BlobField from "./BlobField.vue";
import SiteLogo from "./SiteLogo.vue";
import {
  site,
  contact,
  navLinks,
  provider,
  practice,
  crisis,
} from "../data/site.js";

const year = new Date().getFullYear();
const phoneHref = computed(() => contact.phone.replace(/[^+\d]/g, ""));
</script>
