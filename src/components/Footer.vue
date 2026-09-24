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
            {{ provider.credentials }}, for adults across {{ practice.state }}.
          </p>
          <p
            class="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-sage-200"
          >
            <span
              class="h-1.5 w-1.5 rounded-full bg-clay-400"
              aria-hidden="true"
            ></span>
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
          <ul class="mt-3 space-y-0.5 text-sm">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="link-underline inline-block py-2 text-sage-200 transition-colors hover:text-white"
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
          <ul class="mt-3 space-y-0.5 text-sm">
            <li>
              <a
                :href="`mailto:${contact.email}`"
                class="link-underline inline-block py-2 transition-colors hover:text-white"
              >
                {{ contact.email }}
              </a>
            </li>

            <li class="py-2 text-sage-300">{{ contact.hours }}</li>
            <li class="py-2 text-sage-300">
              {{ practice.modality }} · {{ practice.state }}, USA
            </li>
          </ul>

          <ul class="mt-4 flex items-center gap-3">
            <li v-for="s in socials" :key="s.name">
              <a
                :href="s.url"
                target="_blank"
                rel="noopener"
                :aria-label="`${s.name}, ${s.handle}`"
                :title="s.handle"
                class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sage-200 transition-colors hover:bg-white/15 hover:text-white"
              >
                <AppIcon :name="s.icon" size="sm" />
              </a>
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
        <p>
          © {{ year }} {{ site.name }}. All rights reserved. ·
          <RouterLink
            to="/privacy"
            class="link-underline inline-block py-2 transition-colors hover:text-white"
          >
            Privacy Policy
          </RouterLink>
        </p>
        <p>{{ provider.role }} · Licensed in {{ practice.state }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import AppIcon from "./AppIcon.vue";
import BlobField from "./BlobField.vue";
import SiteLogo from "./SiteLogo.vue";
import {
  site,
  contact,
  navLinks,
  socials,
  provider,
  practice,
  crisis,
} from "../data/site.js";

const year = new Date().getFullYear();
</script>
