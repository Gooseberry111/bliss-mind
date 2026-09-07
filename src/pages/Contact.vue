<template>
  <div>
    <!-- Page Header -->
    <section class="bg-sage-800 px-6 py-20 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
      <p class="text-sage-200 text-lg max-w-xl mx-auto">
        Reach out or book an appointment — we're here for you.
      </p>
    </section>

    <!-- Contact + Form -->
    <section class="bg-cream px-6 py-20">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <!-- Left: Info + Calendly -->
        <div>
          <h2 class="text-2xl font-bold text-sage-900 mb-6">
            Book an Appointment
          </h2>
          <p class="text-sage-700 mb-8 leading-relaxed">
            Use the scheduler below to pick a time that works for you. All
            appointments are confidential and can be held in-person or
            virtually.
          </p>

          <!-- Calendly Embed -->
          <div
            class="rounded-2xl overflow-hidden border border-sage-200 bg-white"
          >
            <iframe
              src="https://calendly.com/blissmind/consultation"
              width="100%"
              height="500"
              frameborder="0"
            ></iframe>
          </div>

          <!-- Contact Details -->
          <div class="mt-10 space-y-4 text-sm text-sage-700">
            <div class="flex items-center gap-3">
              <span class="text-xl">📧</span>
              <span>hello@blissmind.com</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xl">📞</span>
              <span>+1 (555) 000-0000</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xl">📍</span>
              <span>123 Wellness Avenue, Suite 4</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xl">🕐</span>
              <span>Mon – Fri: 8am – 6pm</span>
            </div>
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div>
          <h2 class="text-2xl font-bold text-sage-900 mb-6">
            Send Us a Message
          </h2>
          <p class="text-sage-700 mb-8 leading-relaxed">
            Have a question or not ready to book yet? Fill out the form and
            we'll get back to you within 24 hours.
          </p>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            @submit.prevent="handleSubmit"
            class="space-y-5"
          >
            <input type="hidden" name="form-name" value="contact" />

            <div>
              <label class="block text-sm font-medium text-sage-900 mb-1"
                >Full Name</label
              >
              <input
                v-model="form.name"
                type="text"
                name="name"
                required
                placeholder="Jane Doe"
                class="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm text-sage-900 bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-900 mb-1"
                >Email Address</label
              >
              <input
                v-model="form.email"
                type="email"
                name="email"
                required
                placeholder="jane@example.com"
                class="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm text-sage-900 bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-900 mb-1"
                >Subject</label
              >
              <input
                v-model="form.subject"
                type="text"
                name="subject"
                placeholder="How can we help?"
                class="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm text-sage-900 bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-900 mb-1"
                >Message</label
              >
              <textarea
                v-model="form.message"
                name="message"
                required
                rows="5"
                placeholder="Tell us a little about what you're looking for..."
                class="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm text-sage-900 bg-white focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-sage-700 text-white font-medium py-3 rounded-full hover:bg-sage-800 transition"
            >
              {{ submitted ? "Message Sent ✓" : "Send Message" }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const submitted = ref(false);

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const handleSubmit = async () => {
  const data = new FormData();
  data.append("form-name", "contact");
  data.append("name", form.value.name);
  data.append("email", form.value.email);
  data.append("subject", form.value.subject);
  data.append("message", form.value.message);

  await fetch("/", { method: "POST", body: data });

  submitted.value = true;
  form.value = { name: "", email: "", subject: "", message: "" };
};
</script>
