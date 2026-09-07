<template>
  <div>
    <!-- Brand Banner -->
    <section class="w-full">
      <img
        src="../assets/images/blissmind.png"
        alt="Bliss Mind — Mind. Balance. Bliss."
        class="w-full object-cover max-h-[500px]"
      />
    </section>
    <!-- Hero -->
    <section class="bg-cream px-6 py-24 md:py-32 text-center">
      <div class="max-w-3xl mx-auto">
        <span
          class="inline-block text-xs font-semibold uppercase tracking-widest text-sage-600 bg-sage-100 px-4 py-1 rounded-full mb-6"
        >
          Professional Psychiatric Care
        </span>
        <h1
          class="text-4xl md:text-6xl font-bold text-sage-900 leading-tight mb-6"
        >
          Your Mind Deserves <br class="hidden md:block" />
          <span class="text-sage-600">Expert Care</span>
        </h1>
        <p
          class="text-sage-800 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          BlissMind offers compassionate, evidence-based psychiatric services
          tailored to help you reclaim clarity, balance, and well-being.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/contact"
            class="bg-sage-700 text-white px-8 py-3 rounded-full font-medium hover:bg-sage-800 transition"
          >
            Book an Appointment
          </RouterLink>
          <RouterLink
            to="/services"
            class="border border-sage-700 text-sage-700 px-8 py-3 rounded-full font-medium hover:bg-sage-50 transition"
          >
            Our Services
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Why Bliss Mind -->
    <section class="bg-white px-6 py-20">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-sage-900 text-center mb-4">
          Why Choose BlissMind?
        </h2>
        <p class="text-center text-sage-700 mb-14 max-w-xl mx-auto">
          We combine clinical expertise with genuine human care — because
          healing is both a science and an art.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="bg-cream rounded-2xl p-8 text-center hover:shadow-md transition"
          >
            <div class="text-4xl mb-4">{{ pillar.icon }}</div>
            <h3 class="text-lg font-semibold text-sage-900 mb-2">
              {{ pillar.title }}
            </h3>
            <p class="text-sm text-sage-700 leading-relaxed">
              {{ pillar.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Snapshot -->
    <section class="bg-cream px-6 py-20">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-sage-900 text-center mb-4">
          What We Offer
        </h2>
        <p class="text-center text-sage-700 mb-14 max-w-xl mx-auto">
          A range of psychiatric services designed to meet you where you are.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="service in services"
            :key="service.title"
            class="bg-white rounded-2xl p-8 hover:shadow-md transition border border-sage-100"
          >
            <div class="text-3xl mb-4">{{ service.icon }}</div>
            <h3 class="text-lg font-semibold text-sage-900 mb-2">
              {{ service.title }}
            </h3>
            <p class="text-sm text-sage-700 leading-relaxed">
              {{ service.desc }}
            </p>
          </div>
        </div>
        <div class="text-center mt-10">
          <RouterLink
            to="/services"
            class="inline-block border border-sage-700 text-sage-700 px-8 py-3 rounded-full font-medium hover:bg-sage-50 transition"
          >
            View All Services
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="bg-sage-800 px-6 py-20 text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Take the First Step?
        </h2>
        <p class="text-sage-200 text-lg mb-8">
          Booking an appointment is simple, private, and completely on your
          terms.
        </p>
        <RouterLink
          to="/contact"
          class="inline-block bg-white text-sage-800 font-semibold px-8 py-3 rounded-full hover:bg-sage-100 transition"
        >
          Book Your Appointment
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const pillars = [
  {
    icon: "🧠",
    title: "Evidence-Based Practice",
    desc: "Every treatment plan is grounded in the latest psychiatric research and clinical guidelines.",
  },
  {
    icon: "🤝",
    title: "Compassionate Care",
    desc: "We listen first. Your story, your pace, your comfort — always at the center of care.",
  },
  {
    icon: "🔒",
    title: "Safe & Confidential",
    desc: "Your privacy is non-negotiable. Everything shared stays between you and your doctor.",
  },
];

const services = [
  {
    icon: "💬",
    title: "Psychiatric Evaluation",
    desc: "Comprehensive mental health assessments to understand your unique needs and history.",
  },
  {
    icon: "💊",
    title: "Medication Management",
    desc: "Careful, monitored prescribing with regular follow-ups to ensure the best outcomes.",
  },
  {
    icon: "🌿",
    title: "Therapy & Counseling",
    desc: "One-on-one sessions focused on healing, coping strategies, and long-term well-being.",
  },
];
</script>
