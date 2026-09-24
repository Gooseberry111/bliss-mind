<template>
  <div>
    <PageHeader
      eyebrow="Legal"
      title="Privacy"
      accent=" Policy."
      subtitle="What this website collects, why, and what happens to it."
    />

    <section class="px-6 py-16 md:py-24">
      <div class="mx-auto max-w-3xl">
        <p
          v-reveal
          class="mb-10 rounded-2xl border border-clay-200 bg-clay-50 px-5 py-4 text-sm leading-relaxed text-ink-soft"
        >
          <strong class="font-semibold text-clay-600">
            This policy covers this website only.
          </strong>
          It is not the Notice of Privacy Practices that applies to your care as
          a patient. That is a separate document you will receive before
          treatment begins.
        </p>

        <div class="space-y-10">
          <section
            v-for="(block, i) in sections"
            :key="block.heading"
            v-reveal="i * 50"
          >
            <h2 class="font-display text-2xl font-medium text-ink md:text-3xl">
              {{ block.heading }}
            </h2>
            <div class="mt-4 space-y-4">
              <p
                v-for="(para, j) in block.body"
                :key="j"
                class="text-sm leading-relaxed text-ink-soft md:text-base"
              >
                {{ para }}
              </p>
              <ul v-if="block.list" class="space-y-2.5 pt-1">
                <li
                  v-for="item in block.list"
                  :key="item"
                  class="flex items-start gap-3 text-sm leading-relaxed text-ink-soft md:text-base"
                >
                  <AppIcon
                    name="check"
                    size="sm"
                    class="mt-1 text-sage-600"
                    :stroke-width="2"
                  />
                  {{ item }}
                </li>
              </ul>
            </div>
          </section>
        </div>

        <p v-reveal class="mt-12 text-xs text-ink-muted">
          Last updated {{ updated }}.
        </p>
      </div>
    </section>

    <CtaBanner
      title="Questions about your privacy?"
      text="Ask us directly. We would rather answer than have you wonder."
      label="Get in touch"
      :note="practice.locationNote"
    />
  </div>
</template>

<script setup>
import AppIcon from "../components/AppIcon.vue";
import CtaBanner from "../components/CtaBanner.vue";
import PageHeader from "../components/PageHeader.vue";
import { contact, practice, site } from "../data/site.js";

// Bump this whenever the policy changes materially.
const updated = "September 2026";

const sections = [
  {
    heading: "What we collect",
    body: [
      "Only what you choose to send us. If you fill in the callback form, we receive your name, email address, phone number if you give one, and the fixed options you select: what your enquiry is about, how you would like to be contacted, and the time of day that suits you.",
      "The form has no free-text box on purpose. It is not a secure channel for health information, so we do not invite you to put any there.",
    ],
  },
  {
    heading: "What we do not collect",
    body: [
      "This website does not use analytics, advertising trackers or third-party cookies. We do not build a profile of you, and we do not sell or share your details with anyone for marketing.",
    ],
  },
  {
    heading: "Why we hold it",
    body: [
      "To reply to you, and to arrange an appointment if that is what you are asking for. Nothing else.",
    ],
  },
  {
    heading: "Who processes it",
    body: [
      "Running a website means a small number of companies handle your message on its way to us:",
    ],
    list: [
      "Our website host, which receives the form submission and passes it on.",
      "Google, which provides the email account the message is delivered to.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Enquiries are kept only as long as they are useful for responding to you and arranging care. Once you become a patient, your clinical record is governed by the separate Notice of Privacy Practices and by the record-keeping rules that apply to healthcare providers, not by this policy.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Email us and we will do it.",
    ],
  },
  {
    heading: "Children",
    body: [
      "This practice sees adults aged 18 and over, and this website is not intended for children.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "If this policy changes we will update this page and the date below.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about anything here can go to ${contact.email}, and we will answer.`,
      `${site.name} is a fully virtual practice. ${practice.locationNote}`,
    ],
  },
];
</script>
