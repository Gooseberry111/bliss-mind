<template>
  <div>
    <!-- Page Header -->
    <section class="bg-sage-800 px-6 py-20 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
        Our Services
      </h1>
      <p class="text-sage-200 text-lg max-w-xl mx-auto">
        Comprehensive psychiatric care tailored to your unique needs.
      </p>
    </section>

    <!-- Services Grid -->
    <section class="bg-cream px-6 py-20">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="service in services"
            :key="service.title"
            class="bg-white rounded-2xl p-8 hover:shadow-md transition border border-sage-100"
          >
            <div class="text-4xl mb-4">{{ service.icon }}</div>
            <h3 class="text-lg font-semibold text-sage-900 mb-3">
              {{ service.title }}
            </h3>
            <p class="text-sm text-sage-700 leading-relaxed mb-4">
              {{ service.desc }}
            </p>
            <ul class="space-y-2">
              <li
                v-for="point in service.points"
                :key="point"
                class="flex items-start gap-2 text-sm text-sage-700"
              >
                <span class="text-sage-500 mt-0.5">✓</span>
                {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="bg-white px-6 py-20">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-sage-900 text-center mb-4">
          How It Works
        </h2>
        <p class="text-center text-sage-700 mb-14 max-w-xl mx-auto">
          Getting started with Bliss Mind is simple and straightforward.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div
            v-for="(step, index) in steps"
            :key="step.title"
            class="text-center"
          >
            <div
              class="w-12 h-12 rounded-full bg-sage-700 text-white flex items-center justify-center text-lg font-bold mx-auto mb-4"
            >
              {{ index + 1 }}
            </div>
            <h3 class="text-base font-semibold text-sage-900 mb-2">
              {{ step.title }}
            </h3>
            <p class="text-sm text-sage-700 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-sage-800 px-6 py-20 text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-white mb-4">
          Not Sure Where to Start?
        </h2>
        <p class="text-sage-200 text-lg mb-8">
          Book a consultation and we'll help you find the right care.
        </p>
        <RouterLink
          to="/contact"
          class="inline-block bg-white text-sage-800 font-semibold px-8 py-3 rounded-full hover:bg-sage-100 transition"
        >
          Book an Appointment
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const services = [
  {
    icon: "💬",
    title: "Psychiatric Evaluation",
    desc: "A thorough assessment of your mental health history, symptoms, and goals to create a personalized care plan.",
    points: [
      "Comprehensive intake assessment",
      "Diagnosis and treatment planning",
      "Follow-up reviews",
    ],
  },
  {
    icon: "💊",
    title: "Medication Management",
    desc: "Careful prescribing and ongoing monitoring to ensure your medication is safe, effective, and right for you.",
    points: [
      "Initial prescription consultation",
      "Regular monitoring and adjustments",
      "Side effect management",
    ],
  },
  {
    icon: "🌿",
    title: "Individual Therapy",
    desc: "One-on-one sessions focused on helping you process emotions, develop coping skills, and achieve lasting well-being.",
    points: [
      "Cognitive Behavioral Therapy (CBT)",
      "Trauma-informed care",
      "Stress and anxiety management",
    ],
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Therapy",
    desc: "Guided sessions to help families navigate conflict, improve communication, and support one another.",
    points: [
      "Family dynamics assessment",
      "Communication skill building",
      "Conflict resolution strategies",
    ],
  },
  {
    icon: "🖥️",
    title: "Telepsychiatry",
    desc: "Receive the same quality of care from the comfort of your home via secure video consultations.",
    points: [
      "Secure virtual sessions",
      "Flexible scheduling",
      "Available nationwide",
    ],
  },
  {
    icon: "🧒",
    title: "Child & Adolescent Psychiatry",
    desc: "Specialized care for young minds navigating developmental, emotional, and behavioral challenges.",
    points: [
      "ADHD evaluation and treatment",
      "Anxiety and depression in youth",
      "Parent guidance sessions",
    ],
  },
];

const steps = [
  { title: "Book", desc: "Schedule your first appointment online in minutes." },
  {
    title: "Consult",
    desc: "Meet your psychiatrist for an initial evaluation.",
  },
  { title: "Plan", desc: "Receive a personalized care plan built around you." },
  { title: "Heal", desc: "Begin your journey with ongoing support and care." },
];
</script>
