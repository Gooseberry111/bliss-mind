<template>
  <nav
    class="w-full bg-cream border-b border-sage-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50"
  >
    <!-- Logo -->
    <RouterLink to="/" class="text-xl font-bold text-sage-900 tracking-tight">
      Bliss<span class="text-sage-600">Mind</span>
    </RouterLink>

    <!-- Desktop Nav -->
    <ul
      class="hidden md:flex items-center gap-8 text-sm font-medium text-sage-900"
    >
      <li>
        <RouterLink to="/" class="hover:text-sage-600 transition"
          >Home</RouterLink
        >
      </li>
      <li>
        <RouterLink to="/about" class="hover:text-sage-600 transition"
          >About</RouterLink
        >
      </li>
      <li>
        <RouterLink to="/services" class="hover:text-sage-600 transition"
          >Services</RouterLink
        >
      </li>
      <li>
        <RouterLink to="/contact" class="hover:text-sage-600 transition"
          >Contact</RouterLink
        >
      </li>
    </ul>

    <!-- CTA Button -->
    <RouterLink
      to="/contact"
      class="hidden md:inline-block bg-sage-700 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-sage-800 transition"
    >
      Book Appointment
    </RouterLink>

    <!-- Mobile Menu Button -->
    <button @click="menuOpen = !menuOpen" class="md:hidden text-sage-900">
      <svg
        v-if="!menuOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Mobile Menu -->
    <div
      v-if="menuOpen"
      class="absolute top-full left-0 w-full bg-cream border-t border-sage-100 px-6 py-4 flex flex-col gap-4 md:hidden"
    >
      <RouterLink
        to="/"
        @click="menuOpen = false"
        class="text-sage-900 font-medium hover:text-sage-600"
        >Home</RouterLink
      >
      <RouterLink
        to="/about"
        @click="menuOpen = false"
        class="text-sage-900 font-medium hover:text-sage-600"
        >About</RouterLink
      >
      <RouterLink
        to="/services"
        @click="menuOpen = false"
        class="text-sage-900 font-medium hover:text-sage-600"
        >Services</RouterLink
      >
      <RouterLink
        to="/contact"
        @click="menuOpen = false"
        class="text-sage-900 font-medium hover:text-sage-600"
        >Contact</RouterLink
      >
      <RouterLink
        to="/contact"
        @click="menuOpen = false"
        class="bg-sage-700 text-white text-sm font-medium px-5 py-2 rounded-full text-center hover:bg-sage-800 transition"
        >Book Appointment</RouterLink
      >
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
const menuOpen = ref(false);
</script>
