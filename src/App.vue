<template>
  <div class="flex min-h-screen flex-col bg-linen">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-sage-900 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-linen"
    >
      Skip to main content
    </a>

    <AnnouncementTicker />
    <Navbar />

    <main id="main" tabindex="-1" class="flex-1 outline-none">
      <RouterView v-slot="{ Component }">
        <Transition
          mode="out-in"
          enter-active-class="transition-opacity duration-300 ease-out"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-150 ease-in"
          leave-to-class="opacity-0"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import AnnouncementTicker from "./components/AnnouncementTicker.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { site } from "./data/site.js";

const route = useRoute();

// Titles and descriptions are declared once, in the route table.
const title = computed(() =>
  route.meta.title
    ? `${route.meta.title} — ${site.name}`
    : `${site.name} — ${site.tagline}`,
);
const description = computed(() => route.meta.description || site.description);
const url = computed(() => site.url + route.path);

useHead({
  title,
  link: [{ rel: "canonical", href: url }],
  meta: [
    { name: "description", content: description },
    {
      name: "robots",
      content: computed(() => route.meta.robots || "index, follow"),
    },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ],
});
</script>
