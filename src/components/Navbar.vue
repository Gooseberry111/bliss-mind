<template>
  <header
    :class="[
      'glass-nav sticky top-0 z-50 w-full transition-all duration-300',
      scrolled
        ? 'border-b border-sage-200/60 shadow-soft'
        : 'border-b border-transparent',
    ]"
  >
    <nav
      aria-label="Main"
      class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8 md:py-4"
    >
      <!-- Left group: menu button (mobile) then logo -->
      <div class="flex items-center gap-3">
        <button
          ref="toggleRef"
          type="button"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-sage-200 bg-white/60 text-ink transition-colors hover:bg-white md:hidden"
          @click="menuOpen = !menuOpen"
        >
          <span
            class="flex h-4 w-5 flex-col justify-between"
            aria-hidden="true"
          >
            <span class="h-[1.5px] w-full bg-current"></span>
            <span class="h-[1.5px] w-full bg-current"></span>
            <span class="h-[1.5px] w-full bg-current"></span>
          </span>
        </button>

        <SiteLogo to="/" />
      </div>

      <!-- Desktop links -->
      <ul class="hidden items-center gap-9 text-sm font-medium md:flex">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink
            :to="link.to"
            class="link-underline text-ink-soft transition-colors hover:text-ink"
            active-class=""
            exact-active-class="text-ink"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <div class="hidden md:block">
        <PillLink to="/contact" size="sm" arrow>Free consult</PillLink>
      </div>
    </nav>
  </header>

  <!--
    Teleported to <body> on purpose: a backdrop-filter nested inside another
    backdrop-filter element (the glass header) has no backdrop to sample and
    renders with no blur at all.
  -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-[60] bg-ink/30 md:hidden"
        aria-hidden="true"
        @click="menuOpen = false"
      ></div>
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-500 ease-out"
      enter-from-class="-translate-x-full"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-to-class="-translate-x-full"
    >
      <div
        v-if="menuOpen"
        id="mobile-menu"
        ref="drawerRef"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        class="glass-drawer fixed inset-y-0 left-0 z-[61] flex w-[56%] min-w-[190px] max-w-[15rem] flex-col border-r border-white/40 shadow-lift md:hidden"
      >
        <div class="flex items-center justify-between px-5 py-4">
          <SiteLogo to="/" size="sm" :wordmark="false" />
          <button
            type="button"
            aria-label="Close menu"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-sage-200 bg-white/70 text-ink"
            @click="menuOpen = false"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              aria-hidden="true"
            >
              <path d="m3 3 10 10M13 3 3 13" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" class="flex-1 overflow-y-auto px-5 pt-3">
          <ul class="flex flex-col">
            <li
              v-for="link in navLinks"
              :key="link.to"
              class="border-b border-sage-200/60 last:border-0"
            >
              <RouterLink
                :to="link.to"
                class="block py-3.5 font-display text-2xl text-ink transition-colors hover:text-sage-600"
                exact-active-class="text-sage-600"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="space-y-4 px-5 pb-7 pt-4">
          <PillLink to="/contact" class="w-full" size="sm" arrow>
            Free consult
          </PillLink>

          <div class="space-y-1.5 pt-1 text-xs">
            <a
              :href="`mailto:${contact.email}`"
              class="block text-ink-soft transition-colors hover:text-ink"
            >
              {{ contact.email }}
            </a>
            <a
              :href="`tel:${phoneHref}`"
              class="block text-ink-soft transition-colors hover:text-ink"
            >
              {{ contact.phone }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import PillLink from "./PillLink.vue";
import SiteLogo from "./SiteLogo.vue";
import { navLinks, contact } from "../data/site.js";

const route = useRoute();
const menuOpen = ref(false);
const scrolled = ref(false);
const drawerRef = ref(null);
const toggleRef = ref(null);

const phoneHref = computed(() => contact.phone.replace(/[^+\d]/g, ""));

// Close the drawer on navigation so it never lingers over the new page.
watch(
  () => route.fullPath,
  () => (menuOpen.value = false),
);

// Lock background scrolling, and move focus into (and back out of) the drawer.
watch(menuOpen, async (open) => {
  document.body.style.overflow = open ? "hidden" : "";
  if (open) {
    await nextTick();
    drawerRef.value?.querySelector("a, button")?.focus();
  } else {
    toggleRef.value?.focus();
  }
});

const focusablesIn = (el) =>
  el ? [...el.querySelectorAll("a[href], button:not([disabled])")] : [];

const onKeydown = (e) => {
  if (!menuOpen.value) return;

  if (e.key === "Escape") {
    menuOpen.value = false;
    return;
  }

  // Keep Tab inside the drawer while it is open.
  if (e.key !== "Tab") return;
  const items = focusablesIn(drawerRef.value);
  if (!items.length) return;

  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
};

const onScroll = () => {
  scrolled.value = window.scrollY > 8;
};

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("scroll", onScroll);
  document.body.style.overflow = "";
});
</script>
