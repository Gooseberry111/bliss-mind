<template>
  <div>
    <!-- Page Header -->
    <section class="bg-sage-800 px-6 py-20 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
      <p class="text-sage-200 text-lg max-w-xl mx-auto">
        Get to know the people and principles behind Bliss Mind.
      </p>
    </section>

    <!-- Mission -->
    <section class="bg-cream px-6 py-20">
      <div class="max-w-4xl mx-auto text-center">
        <span
          class="inline-block text-xs font-semibold uppercase tracking-widest text-sage-600 bg-sage-100 px-4 py-1 rounded-full mb-6"
        >
          Our Mission
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-sage-900 mb-6">
          Healing Minds, Restoring Lives
        </h2>
        <p class="text-sage-700 text-lg leading-relaxed">
          At Bliss Mind, we believe that mental health is not a luxury — it is a
          fundamental right. Our mission is to provide accessible,
          compassionate, and evidence-based psychiatric care that empowers every
          individual to live a fuller, healthier life.
        </p>
      </div>
    </section>

    <!-- Values -->
    <section class="bg-white px-6 py-20">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-sage-900 text-center mb-4">
          Our Core Values
        </h2>
        <p class="text-center text-sage-700 mb-14 max-w-xl mx-auto">
          Everything we do is guided by these principles.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="value in values"
            :key="value.title"
            class="bg-cream rounded-2xl p-6 text-center hover:shadow-md transition"
          >
            <div class="text-4xl mb-4">{{ value.icon }}</div>
            <h3 class="text-base font-semibold text-sage-900 mb-2">
              {{ value.title }}
            </h3>
            <p class="text-sm text-sage-700 leading-relaxed">
              {{ value.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="bg-cream px-6 py-20">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-sage-900 text-center mb-4">
          Meet the Team
        </h2>
        <p class="text-center text-sage-700 mb-14 max-w-xl mx-auto">
          Experienced professionals dedicated to your mental well-being.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="member in team"
            :key="member.name"
            class="bg-white rounded-2xl p-8 text-center hover:shadow-md transition border border-sage-100"
          >
            <div
              class="w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center text-4xl mx-auto mb-4"
            >
              {{ member.avatar }}
            </div>
            <h3 class="text-lg font-semibold text-sage-900">
              {{ member.name }}
            </h3>
            <p class="text-sm text-sage-600 mb-3">{{ member.role }}</p>
            <p class="text-sm text-sage-700 leading-relaxed">
              {{ member.bio }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-sage-800 px-6 py-20 text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-white mb-4">
          Ready to Begin Your Journey?
        </h2>
        <p class="text-sage-200 text-lg mb-8">
          Our team is here to support you every step of the way.
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
const values = [
  {
    icon: "💛",
    title: "Empathy",
    desc: "We lead with compassion and genuine care for every patient.",
  },
  {
    icon: "🔬",
    title: "Evidence-Based",
    desc: "Our treatments are grounded in the latest clinical research.",
  },
  {
    icon: "🔒",
    title: "Confidentiality",
    desc: "Your privacy is protected at every step of your care.",
  },
  {
    icon: "🌱",
    title: "Growth",
    desc: "We are committed to your long-term healing and personal growth.",
  },
];

const team = [
  {
    avatar: "👩‍⚕️",
    name: "Dr. Sarah Okonkwo",
    role: "Lead Psychiatrist",
    bio: "Board-certified psychiatrist with over 15 years of experience in adult and adolescent mental health.",
  },
  {
    avatar: "👨‍⚕️",
    name: "Dr. James Adeyemi",
    role: "Clinical Psychologist",
    bio: "Specializes in cognitive behavioral therapy and trauma-informed care for individuals and groups.",
  },
  {
    avatar: "👩‍⚕️",
    name: "Dr. Amaka Nwosu",
    role: "Psychiatric Nurse Practitioner",
    bio: "Expert in medication management and holistic psychiatric support for chronic mental health conditions.",
  },
];
</script>
