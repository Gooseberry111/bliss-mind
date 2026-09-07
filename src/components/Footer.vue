<template>
  <footer class="bg-sage-900 text-cream px-6 py-12 mt-auto">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      <!-- Brand -->
      <div>
        <h2 class="text-xl font-bold mb-3">
          Bliss<span class="text-sage-400">Mind</span>
        </h2>
        <p class="text-sm text-sage-200 leading-relaxed">
          Professional psychiatric care rooted in compassion, clarity, and
          evidence-based practice.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-widest text- mb-4">
          Quick Links
        </h3>
        <ul class="space-y-2 text-sm text-sage-200">
          <li>
            <RouterLink to="/" class="hover:text-white transition"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/about" class="hover:text-white transition"
              >About</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/services" class="hover:text-white transition"
              >Services</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/contact" class="hover:text-white transition"
              >Contact</RouterLink
            >
          </li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div>
        <h3
          class="text-sm font-semibold uppercase tracking-widest text-sage-400 mb-4"
        >
          Contact
        </h3>
        <ul class="space-y-2 text-sm text-sage-200">
          <li>📧 hello@blissmind.com</li>
          <li>📞 +1 (555) 000-0000</li>
          <li>📍 123 Wellness Avenue, Suite 4</li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div
      class="max-w-6xl mx-auto mt-10 pt-6 border-t border-sage-700 text-center text-xs text-sage-400"
    >
      © {{ new Date().getFullYear() }} BlissMind. All rights reserved.
    </div>
  </footer>
</template>
