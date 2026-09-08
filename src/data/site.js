// Single source of truth for site-wide content.
//
// NOTE FOR REVIEW: all clinical and pricing copy below is a first draft written
// from the practice brief. Dr. Ukata should read and approve it before launch.

export const site = {
  name: "Bliss Mind",
  tagline: "Mental health. Mindful living. Real support.",
  description:
    "Virtual psychiatric care in Kansas with Dr. Jemimah Ukata, PMHNP. Treating anxiety, depression, ADHD, PTSD, OCD, sleep disorders and postpartum depression. Free 15-minute consultation.",
  // TODO: replace with the production domain before launch.
  url: "https://blissmind.com",
};

export const provider = {
  name: "Dr. Jemimah Ukata",
  credentials: "PMHNP",
  role: "Psychiatric Mental Health Nurse Practitioner",
  shortBio:
    "A psychiatric mental health nurse practitioner who believes good care starts with being genuinely heard.",
  bio: [
    "Dr. Jemimah Ukata is a Psychiatric Mental Health Nurse Practitioner providing virtual psychiatric care to adults across Kansas. Her practice is built on a simple idea: people do better when they feel heard before they feel treated.",
    "She works with anxiety, depression, ADHD, PTSD, OCD, sleep difficulties and postpartum depression — combining careful evaluation, evidence-based treatment and medication management where it is appropriate, always at a pace that feels right for you.",
  ],
  // TODO: add further qualifications, license numbers and affiliations here.
  qualifications: [
    "Psychiatric Mental Health Nurse Practitioner (PMHNP)",
    "Licensed in the State of Kansas",
  ],
};

export const practice = {
  state: "Kansas",
  modality: "Telehealth only",
  // No physical address yet — the practice is fully virtual.
  hasOfficeAddress: false,
  locationNote:
    "Bliss Mind is a fully virtual practice. Appointments are held by secure video, and you will need to be physically located in Kansas at the time of your appointment.",
};

export const contact = {
  email: "blissmindss@gmail.com",
  phone: "+1 (555) 000-0000", // TODO: real number
  // Exact times vary by day, so the booking calendar is the source of truth
  // rather than a fixed range here that would drift out of date.
  hours: "Mon – Fri, by appointment",
};

// Online booking.
//
// The scheduler is whatever tool shows your free/busy times, lets someone pick
// a slot, and emails both of you a video link — Google Calendar appointment
// schedules, Calendly, SimplePractice, and so on. The video call itself
// (Google Meet, Zoom) is created by that tool; the website only links to it.
//
// `mode`: "embed" puts the scheduler inline on the Contact page,
//         "link"  shows a card with a button that opens it in a new tab.
// Leave `url` empty and the page shows a "call or email us" fallback instead,
// so the site never renders a broken scheduler.
export const booking = {
  mode: "embed",
  // Google Calendar appointment schedule. `url` is the long form plus
  // ?gv=true, which is the variant Google serves for embedding — the short
  // calendar.app.google link sends X-Frame-Options: SAMEORIGIN and is blocked
  // inside an iframe. `shareUrl` is the pretty short link, used wherever the
  // booking page is opened in a new tab.
  url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2xqLJXMl0DoHHcrwcbh2web4sTSnKUtghl_YbsAwYKmZwiHO5l2QWUKuD48IOPK-FcIx4ktTaw?gv=true",
  shareUrl: "https://calendar.app.google/XrUzxRGdAhSqmqQ16",
  providerName: "Google Calendar",
};

// The free consultation, described once.
//
// Keep this in sync with the Description field on the Google Calendar
// appointment schedule — patients read both, and mismatched expectations
// between the booking page and the site look careless.
export const consult = {
  headline: "Your first appointment is free.",
  duration: "15 minutes",
  summary:
    "A short, no-pressure conversation to talk through what’s going on, answer your questions, and decide together whether Bliss Mind is the right fit — and if so, how often we’d meet. There’s no cost and no obligation.",
  points: [
    "We meet by Google Meet — your link will be in the confirmation email.",
    "You’ll need to be physically located in Kansas at the time of the call.",
    "Please don’t include medical details when booking. We’ll cover all of that in the conversation, privately.",
    "This consultation is not a clinical evaluation or treatment.",
  ],
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

// Scrolling announcement bar. Keep these short and factual.
export const announcements = [
  "Now accepting new patients",
  "Free 15-minute consultation",
  "100% virtual care across Kansas",
  "Secure video appointments",
];

export const conditions = [
  {
    icon: "wave",
    name: "Anxiety",
    desc: "Persistent worry, panic, restlessness, or a mind that will not switch off.",
  },
  {
    icon: "cloud",
    name: "Depression",
    desc: "Low mood, loss of interest, exhaustion, or feeling flat for weeks at a time.",
  },
  {
    icon: "bolt",
    name: "ADHD",
    desc: "Difficulty with focus, follow-through, organization, restlessness or impulsivity.",
  },
  {
    icon: "shield",
    name: "PTSD",
    desc: "Distress, flashbacks, hypervigilance or avoidance after a traumatic experience.",
  },
  {
    icon: "loop",
    name: "OCD",
    desc: "Intrusive thoughts and repetitive behaviors that take more time than you want.",
  },
  {
    icon: "moon",
    name: "Sleep Disorders",
    desc: "Trouble falling asleep, staying asleep, or waking up without feeling rested.",
  },
  {
    icon: "heart",
    name: "Postpartum Depression",
    desc: "Sadness, anxiety or overwhelm in the weeks and months after having a baby.",
  },
];

export const careApproach = [
  {
    icon: "chat",
    title: "Psychiatric Evaluation",
    desc: "A careful, unhurried assessment of your history, symptoms and goals — the foundation of everything that follows.",
  },
  {
    icon: "pill",
    title: "Medication Management",
    desc: "Where medication is appropriate, it is prescribed thoughtfully and reviewed regularly, with side effects taken seriously.",
  },
  {
    icon: "leaf",
    title: "Ongoing Support",
    desc: "Follow-up appointments that track what is working, adjust what is not, and keep you moving forward.",
  },
];

export const steps = [
  {
    title: "Book your free consult",
    desc: "Pick a 15-minute slot online. No cost, no commitment.",
  },
  {
    title: "Talk it through",
    desc: "We discuss what you are dealing with and whether this is the right fit.",
  },
  {
    title: "Agree a plan",
    desc: "If we go ahead, we set your schedule and build a plan around you.",
  },
  {
    title: "Get ongoing care",
    desc: "Regular sessions with adjustments as your needs change.",
  },
];

// Set `visible: false` to hide every price on the site without removing copy.
export const pricing = {
  visible: true,
  currencyNote: "All fees are in USD. Bliss Mind is a self-pay practice.",
  plans: [
    {
      name: "Initial Consultation",
      price: "Free",
      unit: "15 minutes",
      highlight: true,
      desc: "A short, no-cost conversation to understand what you are dealing with and agree how and when we would meet.",
      includes: [
        "No cost and no obligation",
        "Understand your concerns",
        "Decide if we are the right fit",
        "Agree your appointment schedule",
      ],
      cta: "Book your free consult",
    },
    {
      name: "Ongoing Sessions",
      price: "$200",
      unit: "per hour",
      highlight: false,
      desc: "Evaluation, treatment and medication management sessions, scheduled at the frequency that suits your care plan.",
      includes: [
        "Full psychiatric evaluation",
        "Medication management where appropriate",
        "Ongoing follow-up and adjustments",
        "Secure video appointments",
      ],
      cta: "Get started",
      // TODO: confirm wording if longer or more complex sessions are billed higher.
      footnote:
        "Longer or more complex sessions may be quoted above this rate.",
    },
  ],
};

export const faqs = [
  {
    q: "Where do you practice?",
    a: "Bliss Mind is a fully virtual practice based in Kansas. Appointments are held by secure video, and you will need to be physically located in Kansas at the time of your appointment.",
  },
  {
    q: "What happens in the first appointment?",
    a: "Your first appointment is a free 15-minute consultation. It is a short conversation to understand what you are dealing with, answer your questions, and agree whether and how often we would meet going forward.",
  },
  {
    q: "Do you take insurance?",
    a: "Bliss Mind is currently a self-pay practice. Sessions are $200 per hour, and the initial 15-minute consultation is free. If you are self-paying you are entitled to a Good Faith Estimate of your costs before you begin — just ask.",
  },
  {
    q: "What do you treat?",
    a: "Anxiety, depression, ADHD, PTSD, OCD, sleep disorders and postpartum depression. If you are not sure whether your concern fits, the free consultation is a good place to ask.",
  },
  {
    q: "Do you prescribe medication?",
    a: "Medication management is part of care where it is clinically appropriate. It is always discussed with you first, reviewed regularly, and never the only thing on the table.",
  },
  {
    q: "Is what I share confidential?",
    a: "Yes. What you discuss in your appointments is confidential and protected. Please note the contact form on this site is not a secure channel — keep it to your contact details and we will discuss anything clinical with you directly.",
  },
];

export const crisis = {
  note: "If you are in crisis or this is a medical emergency, do not use this site.",
  line: "Call or text 988 for the Suicide & Crisis Lifeline, or dial 911.",
};
