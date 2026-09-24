<template>
  <div>
    <PageHeader
      eyebrow="Contact"
      title="Let’s start with"
      accent=" a conversation."
      subtitle="Book a free 15-minute consultation, or leave your details and we’ll reach out."
    />

    <section class="relative isolate overflow-hidden px-6 py-16 md:py-28">
      <BlobField palette="mixed" class="opacity-40" />

      <div
        class="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16"
      >
        <!-- ============ Left: scheduler + details ============ -->
        <div>
          <SectionHeading
            eyebrow="Book online"
            title="Pick a time that"
            accent=" suits you."
            align="left"
            spacing="mb-8"
            class="max-w-none"
          />

          <div
            v-reveal
            class="mb-8 rounded-3xl border border-sage-200 bg-sage-50/70 p-6"
          >
            <p class="flex flex-wrap items-baseline gap-x-2">
              <strong class="font-display text-2xl font-medium text-ink">
                {{ consult.headline }}
              </strong>
              <span
                class="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-sage-600"
              >
                {{ consult.duration }}
              </span>
            </p>

            <p class="mt-3 text-sm leading-relaxed text-ink-soft">
              {{ consult.summary }}
            </p>

            <ul class="mt-5 space-y-2.5">
              <li
                v-for="point in consult.points"
                :key="point"
                class="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft"
              >
                <AppIcon
                  name="check"
                  size="sm"
                  class="mt-0.5 text-sage-600"
                  :stroke-width="2"
                />
                {{ point }}
              </li>
            </ul>
          </div>

          <!-- Scheduler (see `booking` in src/data/site.js) -->
          <div v-reveal="80">
            <BookingWidget />
          </div>

          <!-- Details -->
          <ul v-reveal="140" class="mt-10 space-y-4">
            <li
              v-for="item in details"
              :key="item.label"
              class="flex items-start gap-4 rounded-2xl border border-sage-100 bg-white/60 px-5 py-4"
            >
              <span
                class="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-sage-50 text-sage-700"
              >
                <AppIcon :name="item.icon" size="sm" />
              </span>
              <span>
                <span
                  class="block text-[0.6rem] font-bold uppercase tracking-[0.18em] text-sage-600"
                >
                  {{ item.label }}
                </span>
                <a
                  v-if="item.href"
                  :href="item.href"
                  class="link-underline inline-block py-1.5 text-sm font-medium text-ink"
                >
                  {{ item.value }}
                </a>
                <span v-else class="text-sm font-medium text-ink">
                  {{ item.value }}
                </span>
              </span>
            </li>
          </ul>

          <div v-reveal="180" class="mt-6">
            <p
              class="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-sage-600"
            >
              Follow along
            </p>
            <ul class="mt-3 flex items-center gap-3">
              <li v-for="s in socials" :key="s.name">
                <a
                  :href="s.url"
                  target="_blank"
                  rel="noopener"
                  :aria-label="`${s.name}, ${s.handle}`"
                  class="flex items-center gap-2.5 rounded-full border border-sage-200 bg-white/60 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-sage-400 hover:bg-white"
                >
                  <AppIcon :name="s.icon" size="sm" class="text-sage-700" />
                  {{ s.handle }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- ============ Right: callback form ============ -->
        <div>
          <SectionHeading
            eyebrow="Or request a callback"
            title="Tell us how to"
            accent=" reach you."
            align="left"
            spacing="mb-6"
            class="max-w-none"
          />

          <p v-reveal class="mb-6 text-sm leading-relaxed text-ink-soft">
            Not ready to book? Leave your details and we’ll follow up within one
            business day.
          </p>

          <!-- This form is not a secure channel for health information. -->
          <div
            v-reveal="60"
            class="mb-8 rounded-2xl border border-clay-200 bg-clay-50 px-5 py-4"
          >
            <p class="text-sm leading-relaxed text-ink-soft">
              <strong class="font-semibold text-clay-600">
                Please don’t share medical details here.
              </strong>
              This form isn’t a secure channel for health information. Keep it
              to your contact details. Anything clinical we’ll discuss with you
              directly, in private.
            </p>
          </div>

          <form
            v-if="api.url"
            v-reveal="120"
            class="glass space-y-5 rounded-3xl p-7 md:p-8"
            @submit.prevent="handleSubmit"
          >
            <p class="hidden">
              <label>
                Leave this field empty:
                <input v-model="botField" name="bot-field" tabindex="-1" />
              </label>
            </p>

            <div>
              <label :for="'name'" :class="labelClass">Full name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                name="name"
                required
                autocomplete="name"
                placeholder="Jane Doe"
                :class="fieldClass"
              />
            </div>

            <div>
              <label for="email" :class="labelClass">Email address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                name="email"
                required
                autocomplete="email"
                placeholder="jane@example.com"
                :class="fieldClass"
              />
            </div>

            <div>
              <label for="phone" :class="labelClass">
                Phone number
                <span class="font-normal text-ink-muted">(optional)</span>
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                name="phone"
                autocomplete="tel"
                placeholder="(555) 123-4567"
                :class="fieldClass"
              />
            </div>

            <div>
              <label for="reason" :class="labelClass"
                >What can we help with?</label
              >
              <select
                id="reason"
                v-model="form.reason"
                name="reason"
                required
                :class="fieldClass"
              >
                <option v-for="r in reasons" :key="r" :value="r">
                  {{ r }}
                </option>
              </select>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label for="preferredContact" :class="labelClass"
                  >Reach me by</label
                >
                <select
                  id="preferredContact"
                  v-model="form.preferredContact"
                  name="preferredContact"
                  :class="fieldClass"
                >
                  <option v-for="m in contactMethods" :key="m" :value="m">
                    {{ m }}
                  </option>
                </select>
              </div>
              <div>
                <label for="bestTime" :class="labelClass">Best time</label>
                <select
                  id="bestTime"
                  v-model="form.bestTime"
                  name="bestTime"
                  :class="fieldClass"
                >
                  <option v-for="t in times" :key="t" :value="t">
                    {{ t }}
                  </option>
                </select>
              </div>
            </div>

            <Transition
              enter-active-class="transition-all duration-300"
              enter-from-class="opacity-0 -translate-y-1"
            >
              <p
                v-if="status === 'success'"
                role="status"
                class="rounded-2xl bg-sage-100 px-4 py-3 text-sm text-sage-800"
              >
                Thanks, we’ve got your details. We’ll reach out within one
                business day.
              </p>
              <p
                v-else-if="status === 'error'"
                role="alert"
                class="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                Something went wrong sending your request. Please try again, or
                email us directly at
                <a :href="`mailto:${contact.email}`" class="underline">{{
                  contact.email
                }}</a
                >.
              </p>
            </Transition>

            <button
              type="submit"
              :disabled="status === 'sending'"
              class="group w-full rounded-full bg-sage-800 py-4 text-sm font-semibold text-linen shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-900 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {{ buttonLabel }}
            </button>
          </form>

          <!-- No endpoint configured yet: point people at email rather than
               showing a form that cannot submit. -->
          <div
            v-else
            v-reveal="120"
            class="glass rounded-3xl p-7 text-center md:p-8"
          >
            <span
              class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/70 text-sage-700"
            >
              <AppIcon name="mail" size="lg" />
            </span>
            <h3 class="font-display text-2xl font-medium text-ink">
              Email us directly
            </h3>
            <p
              class="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft"
            >
              Tell us your name and the best way to reach you, and we’ll get
              back to you within one business day.
            </p>
            <PillLink :href="`mailto:${contact.email}`" class="mt-6" arrow>
              {{ contact.email }}
            </PillLink>
          </div>

          <!-- Crisis notice -->
          <div
            v-reveal
            class="mt-6 rounded-2xl border border-clay-300/50 bg-white/60 px-5 py-4"
          >
            <p class="text-xs leading-relaxed text-ink-soft">
              <strong class="font-semibold text-clay-600">{{
                crisis.note
              }}</strong>
              {{ crisis.line }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import AppIcon from "../components/AppIcon.vue";
import BookingWidget from "../components/BookingWidget.vue";
import BlobField from "../components/BlobField.vue";
import PageHeader from "../components/PageHeader.vue";
import PillLink from "../components/PillLink.vue";
import SectionHeading from "../components/SectionHeading.vue";
import {
  api,
  contact,
  consult,
  practice,
  crisis,
  socials,
} from "../data/site.js";

const labelClass = "mb-1.5 block text-sm font-medium text-ink";
const fieldClass =
  "w-full rounded-2xl border border-sage-200 bg-white/80 px-4 py-3 text-sm text-ink " +
  "transition-colors placeholder:text-ink-muted focus:border-sage-400 focus:outline-none " +
  "focus:ring-2 focus:ring-sage-300";

// Structured options only: this form deliberately has no free-text field, so
// patients are not invited to disclose health information through it.
const reasons = [
  "Booking a new appointment",
  "Question about fees",
  "Existing patient: admin question",
  "Something else",
];
const contactMethods = ["Email", "Phone call"];
const times = ["Any time", "Morning", "Afternoon", "Evening"];

const details = computed(() => [
  {
    icon: "mail",
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },

  { icon: "clock", label: "Hours", value: contact.hours, href: "" },
  {
    icon: "monitor",
    label: "Where",
    value: `${practice.modality} · ${practice.state}, USA`,
    href: "",
  },
]);

// "idle" | "sending" | "success" | "error"
const status = ref("idle");
const botField = ref("");

const emptyForm = () => ({
  name: "",
  email: "",
  phone: "",
  reason: reasons[0],
  preferredContact: contactMethods[0],
  bestTime: times[0],
});

const form = ref(emptyForm());

const buttonLabel = computed(() => {
  if (status.value === "sending") return "Sending…";
  if (status.value === "success") return "Request sent";
  return "Request a callback";
});

const handleSubmit = async () => {
  if (status.value === "sending") return;
  status.value = "sending";

  const payload = {
    action: "contact",
    website: botField.value, // honeypot
    ...form.value,
  };

  try {
    // text/plain keeps this a "simple" request, because Apps Script cannot answer
    // the CORS preflight that application/json would trigger.
    const res = await fetch(api.url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.ok) throw new Error(data.message || "Request failed");

    status.value = "success";
    form.value = emptyForm();
  } catch (err) {
    console.error("Callback request failed:", err);
    status.value = "error";
  }
};
</script>
