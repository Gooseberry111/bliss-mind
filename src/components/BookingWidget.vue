<template>
  <!-- Not configured yet: never render a broken widget -->
  <div
    v-if="!api.url || !booking.enabled"
    class="rounded-3xl border border-dashed border-sage-300 bg-sage-50/60 p-8 text-center"
  >
    <span
      class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-sage-700"
    >
      <AppIcon name="clock" size="lg" />
    </span>
    <h3 class="font-display text-2xl font-medium text-ink">
      Online booking is coming soon
    </h3>
    <p class="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
      In the meantime, request a callback using the form, or reach out directly
      and we'll find a time that works.
    </p>
    <div
      class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
    >
      <PillLink :href="`mailto:${contact.email}`" variant="outline">
        {{ contact.email }}
      </PillLink>
    </div>
  </div>

  <!-- Booked -->
  <div
    v-else-if="stage === 'done'"
    class="rounded-3xl border border-sage-200 bg-white p-8 text-center shadow-soft"
  >
    <span
      class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-700"
    >
      <AppIcon name="check" size="lg" :stroke-width="2" />
    </span>
    <h3 class="font-display text-3xl font-medium text-ink">You're booked</h3>
    <p class="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
      We've sent a confirmation to <strong>{{ form.email }}</strong> with your
      video link and everything you need.
    </p>
    <div
      class="mx-auto mt-6 max-w-xs rounded-2xl bg-sage-50 px-5 py-4 text-sm text-ink"
    >
      <p class="font-semibold">{{ longDate(confirmed.date) }}</p>
      <p class="mt-1">
        {{ confirmed.startLabel }} · {{ booking.timezoneLabel }}
      </p>
    </div>
    <p class="mt-5 text-xs text-ink-muted">
      Reference {{ confirmed.bookingId }}
    </p>
    <button
      type="button"
      class="link-underline mt-6 inline-block py-2 text-sm font-semibold text-sage-700"
      @click="reset"
    >
      Book another time
    </button>
  </div>

  <!-- Picker + form -->
  <div
    v-else
    class="rounded-3xl border border-sage-200 bg-white p-5 shadow-soft md:p-7"
  >
    <!-- Header -->
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h3 class="font-display text-2xl font-medium text-ink">Choose a time</h3>
      <p
        class="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-sage-600"
      >
        All times {{ booking.timezoneLabel }}
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="py-14 text-center">
      <span
        class="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-sage-200 border-t-sage-600"
        aria-hidden="true"
      ></span>
      <p class="mt-4 text-sm text-ink-soft">Loading available times…</p>
    </div>

    <!-- Could not reach the scheduler -->
    <div
      v-else-if="loadError"
      class="mt-6 rounded-2xl border border-clay-200 bg-clay-50 px-5 py-4 text-sm leading-relaxed text-ink-soft"
      role="alert"
    >
      <strong class="font-semibold text-clay-600">
        We couldn't load the calendar.
      </strong>
      Please refresh, or email
      <a :href="`mailto:${contact.email}`" class="underline">{{
        contact.email
      }}</a>
      and we'll book you in.
    </div>

    <template v-else>
      <!-- Date strip -->
      <div class="mt-5">
        <div class="flex items-center justify-between gap-3">
          <button
            type="button"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sage-200 text-ink transition-colors hover:bg-sage-50 disabled:opacity-35"
            :disabled="weekOffset === 0"
            aria-label="Previous dates"
            @click="weekOffset--"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path
                d="M10 3 5 8l5 5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <p class="text-sm font-semibold text-ink">{{ rangeLabel }}</p>

          <button
            type="button"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sage-200 text-ink transition-colors hover:bg-sage-50 disabled:opacity-35"
            :disabled="(weekOffset + 1) * daysPerPage >= days.length"
            aria-label="Later dates"
            @click="weekOffset++"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path
                d="m6 3 5 5-5 5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div class="mt-4 grid grid-cols-7 gap-1.5">
          <button
            v-for="day in visibleDays"
            :key="day.date"
            type="button"
            :disabled="day.openCount === 0"
            :aria-pressed="day.date === selectedDate"
            :class="[
              'flex flex-col items-center rounded-xl px-1 py-2.5 transition-all duration-200',
              day.date === selectedDate
                ? 'bg-sage-800 text-linen shadow-soft'
                : day.openCount === 0
                  ? 'cursor-not-allowed text-ink-muted opacity-45'
                  : 'bg-sage-50 text-ink hover:bg-sage-100',
            ]"
            @click="selectDate(day.date)"
          >
            <span class="text-[0.6rem] font-bold uppercase tracking-wider">
              {{ day.weekday.slice(0, 3) }}
            </span>
            <span class="mt-0.5 font-display text-lg leading-none">
              {{ dayOfMonth(day.date) }}
            </span>
          </button>
        </div>
      </div>

      <!--
        Kept outside the form on purpose: when a slot is taken out from under
        the user we clear the selection, which unmounts the form. An error
        rendered inside it would vanish at the moment it is most needed.
      -->
      <p
        v-if="submitError"
        role="alert"
        class="mt-6 rounded-2xl bg-clay-50 px-4 py-3 text-sm leading-relaxed text-clay-600"
      >
        {{ submitError }}
      </p>

      <!-- Slots -->
      <div class="mt-6">
        <p
          v-if="!selectedDay || selectedDay.slots.length === 0"
          class="rounded-2xl bg-sage-50 px-5 py-6 text-center text-sm text-ink-soft"
        >
          No appointments on this day. Try another date.
        </p>

        <div v-else class="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <button
            v-for="slot in selectedDay.slots"
            :key="slot.time"
            type="button"
            :disabled="!slot.available"
            :aria-label="
              slot.available
                ? `${slot.label} — available`
                : `${slot.label} — not available`
            "
            :class="[
              'rounded-xl border px-2 py-3 text-sm font-medium transition-all duration-200',
              slot.time === selectedTime
                ? 'border-sage-800 bg-sage-800 text-linen'
                : slot.available
                  ? 'border-sage-200 bg-white text-ink hover:-translate-y-0.5 hover:border-sage-500'
                  : 'cursor-not-allowed border-transparent bg-sage-50 text-ink-muted line-through opacity-60',
            ]"
            @click="selectTime(slot)"
          >
            {{ slot.label }}
          </button>
        </div>
      </div>

      <!-- Details form -->
      <form
        v-if="selectedTime"
        ref="formRef"
        class="mt-7 border-t border-sage-100 pt-7"
        @submit.prevent="submit"
      >
        <p class="mb-5 rounded-2xl bg-sage-50 px-4 py-3 text-sm text-ink">
          <strong class="font-semibold">{{ longDate(selectedDate) }}</strong>
          at {{ selectedLabel }} · {{ booking.timezoneLabel }}
        </p>

        <!-- honeypot -->
        <input
          v-model="form.website"
          type="text"
          name="website"
          tabindex="-1"
          autocomplete="off"
          class="hidden"
          aria-hidden="true"
        />

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label for="bk-first" :class="labelClass">First name</label>
            <input
              id="bk-first"
              v-model="form.firstName"
              type="text"
              required
              autocomplete="given-name"
              :class="fieldClass"
            />
          </div>
          <div>
            <label for="bk-last" :class="labelClass">Last name</label>
            <input
              id="bk-last"
              v-model="form.lastName"
              type="text"
              required
              autocomplete="family-name"
              :class="fieldClass"
            />
          </div>
          <div>
            <label for="bk-email" :class="labelClass">Email</label>
            <input
              id="bk-email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              :class="fieldClass"
            />
          </div>
          <div>
            <label for="bk-phone" :class="labelClass">Phone</label>
            <input
              id="bk-phone"
              v-model="form.phone"
              type="tel"
              required
              autocomplete="tel"
              :class="fieldClass"
            />
          </div>
        </div>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label for="bk-reason" :class="labelClass"
              >What's this about?</label
            >
            <select id="bk-reason" v-model="form.reason" :class="fieldClass">
              <option v-for="r in booking.reasons" :key="r" :value="r">
                {{ r }}
              </option>
            </select>
          </div>
          <div>
            <label for="bk-heard" :class="labelClass">
              How did you hear about us?
              <span class="font-normal text-ink-muted">(optional)</span>
            </label>
            <select id="bk-heard" v-model="form.heardVia" :class="fieldClass">
              <option value="">Prefer not to say</option>
              <option v-for="h in booking.heardVia" :key="h" :value="h">
                {{ h }}
              </option>
            </select>
          </div>
        </div>

        <!-- Eligibility + consent -->
        <div class="mt-5 space-y-3">
          <label
            v-for="check in checks"
            :key="check.key"
            class="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft"
          >
            <input
              v-model="form[check.key]"
              type="checkbox"
              required
              class="mt-0.5 h-4 w-4 shrink-0 rounded border-sage-300 text-sage-700 focus:ring-sage-400"
            />
            <span>{{ check.label }}</span>
          </label>
        </div>

        <button
          type="submit"
          :disabled="submitting"
          class="mt-6 w-full rounded-full bg-sage-800 py-4 text-sm font-semibold text-linen shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-900 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {{ submitting ? "Booking…" : "Confirm booking" }}
        </button>

        <p class="mt-4 text-center text-xs leading-relaxed text-ink-muted">
          Please don't include medical details here. We'll cover all of that in
          the conversation, privately.
        </p>
      </form>
    </template>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from "vue";
import AppIcon from "./AppIcon.vue";
import PillLink from "./PillLink.vue";
import { api, booking, contact } from "../data/site.js";

const labelClass = "mb-1.5 block text-sm font-medium text-ink";
const fieldClass =
  "w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm text-ink " +
  "transition-colors placeholder:text-ink-muted focus:border-sage-400 focus:outline-none " +
  "focus:ring-2 focus:ring-sage-300";

const checks = [
  {
    key: "inKansas",
    label:
      "I will be physically located in Kansas at the time of my appointment.",
  },
  { key: "isAdult", label: "I am 18 years of age or older." },
  {
    key: "consent",
    label:
      "I understand this is a free 15-minute consultation, not a clinical evaluation or treatment, and is not for emergencies.",
  },
];

const daysPerPage = 7;

const loading = ref(true);
const loadError = ref(false);
const days = ref([]);
const weekOffset = ref(0);
const selectedDate = ref("");
const selectedTime = ref("");
const selectedLabel = ref("");
const stage = ref("pick"); // "pick" | "done"
const submitting = ref(false);
const submitError = ref("");
const confirmed = ref({});
const formRef = ref(null);

const emptyForm = () => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  reason: booking.reasons[0],
  heardVia: "",
  inKansas: false,
  isAdult: false,
  consent: false,
  website: "",
});
const form = ref(emptyForm());

const visibleDays = computed(() =>
  days.value.slice(
    weekOffset.value * daysPerPage,
    weekOffset.value * daysPerPage + daysPerPage,
  ),
);

const selectedDay = computed(() =>
  days.value.find((d) => d.date === selectedDate.value),
);

const rangeLabel = computed(() => {
  const list = visibleDays.value;
  if (!list.length) return "";
  const fmt = (d) =>
    new Date(`${d}T12:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  return `${fmt(list[0].date)} – ${fmt(list[list.length - 1].date)}`;
});

const dayOfMonth = (date) => Number(date.slice(8, 10));

const longDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

async function loadAvailability() {
  loading.value = true;
  loadError.value = false;
  try {
    const to = new Date();
    to.setDate(to.getDate() + (booking.daysVisible || 28));
    const url =
      `${api.url}?action=availability` + `&to=${to.toISOString().slice(0, 10)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.ok) throw new Error(data.message || "Unavailable");

    days.value = data.days || [];
    // Land on the first day that actually has something free.
    const firstOpen = days.value.find((d) => d.openCount > 0);
    if (firstOpen) {
      selectedDate.value = firstOpen.date;
      weekOffset.value = Math.floor(
        days.value.indexOf(firstOpen) / daysPerPage,
      );
    }
  } catch (err) {
    console.error("Booking availability failed:", err);
    loadError.value = true;
  } finally {
    loading.value = false;
  }
}

function selectDate(date) {
  selectedDate.value = date;
  selectedTime.value = "";
  submitError.value = "";
}

async function selectTime(slot) {
  if (!slot.available) return;
  selectedTime.value = slot.time;
  selectedLabel.value = slot.label;
  submitError.value = "";
  await nextTick();
  formRef.value?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

async function submit() {
  if (submitting.value) return;
  submitting.value = true;
  submitError.value = "";

  try {
    // text/plain keeps this a "simple" request — Apps Script cannot answer
    // the CORS preflight that application/json would trigger.
    const res = await fetch(api.url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "book",
        date: selectedDate.value,
        time: selectedTime.value,
        ...form.value,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (!data.ok) {
      submitError.value =
        data.message || "Something went wrong. Please try another time.";
      // Someone else took it — refresh so the grid reflects reality.
      if (data.error === "SLOT_TAKEN") {
        selectedTime.value = "";
        await loadAvailability();
      }
      return;
    }

    confirmed.value = data;
    stage.value = "done";
  } catch (err) {
    console.error("Booking failed:", err);
    submitError.value =
      "We couldn't reach the booking system. Please try again, or email us and we'll book you in.";
  } finally {
    submitting.value = false;
  }
}

function reset() {
  stage.value = "pick";
  selectedTime.value = "";
  submitError.value = "";
  form.value = emptyForm();
  loadAvailability();
}

onMounted(() => {
  if (api.url && booking.enabled) loadAvailability();
  else loading.value = false;
});
</script>
