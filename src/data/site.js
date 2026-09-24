// Single source of truth for site-wide content.
//
// NOTE FOR REVIEW: all clinical and pricing copy below is a first draft written
// from the practice brief. Dr. Ukata should read and approve it before launch.

export const site = {
  name: "Bliss Mind",
  tagline: "Mental health. Mindful living. Real support.",
  description:
    "Virtual psychiatric care in Kansas with Dr. Jemimah Ukata, PMHNP. Treating anxiety, depression, ADHD, PTSD, OCD, sleep disorders and postpartum depression. Free 15-minute consultation.",
  url: "https://blissmind.netlify.app",
};

export const provider = {
  name: "Dr. Jemimah Ukata",
  credentials: "PMHNP",
  role: "Psychiatric Mental Health Nurse Practitioner",
  shortBio:
    "A psychiatric mental health nurse practitioner who believes good care starts with being genuinely heard.",
  bio: [
    "Dr. Jemimah Ukata is a Psychiatric Mental Health Nurse Practitioner providing virtual psychiatric care to adults across Kansas. Her practice is built on a simple idea: people do better when they feel heard before they feel treated.",
    "She works with anxiety, depression, ADHD, PTSD, OCD, sleep difficulties and postpartum depression. Her approach combines careful evaluation, evidence-based treatment and medication management where it is appropriate, always at a pace that feels right for you.",
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
  // No physical address yet; the practice is fully virtual.
  hasOfficeAddress: false,
  locationNote:
    "Bliss Mind is a fully virtual practice. Appointments are held by secure video, and you will need to be physically located in Kansas at the time of your appointment.",
};

export const contact = {
  email: "blissmindss@gmail.com",
  // No dedicated practice line yet. Leaving this empty hides every phone
  // link on the site rather than showing a number nobody answers.
  phone: "",
  hours: "Monday to Friday, by appointment",
};

export const socials = [
  {
    name: "Instagram",
    handle: "@bliss__mind",
    url: "https://instagram.com/bliss__mind",
    icon: "instagram",
  },
  {
    name: "TikTok",
    handle: "@bliss.mind",
    url: "https://tiktok.com/@bliss.mind",
    icon: "tiktok",
  },
];

// One Google Apps Script web app backs both the callback form and, later,
// online booking. See apps-script/Code.gs and docs/BOOKING-SETUP.md.
//
// Until `url` is set, the callback form and the booking widget both show a
// "reach us by email" fallback rather than silently failing.
export const api = {
  url: "", // TODO: paste the Apps Script /exec URL after deploying
};

export const booking = {
  // Flip to true once the spreadsheet tabs and availability are configured.
  // The form works without this; booking does not.
  enabled: false,
  daysVisible: 28,
  timezoneLabel: "Central Time (CT)",
  reasons: [
    "New patient consultation",
    "Question about fees",
    "Existing patient: admin question",
    "Something else",
  ],
  heardVia: [
    "Google search",
    "Social media",
    "Referred by a friend or family member",
    "Referred by another provider",
    "Somewhere else",
  ],
};

export const consult = {
  headline: "Your first appointment is free.",
  duration: "15 minutes",
  summary:
    "A short, no-pressure conversation to talk through what’s going on, answer your questions, and decide together whether Bliss Mind is the right fit. If it is, we’ll agree how often to meet. There’s no cost and no obligation.",
  points: [
    "We meet by secure video. Your link is sent by email beforehand.",
    "You’ll need to be physically located in Kansas at the time of the call.",
    "Please don’t include medical details when you get in touch. We’ll cover all of that in the conversation, privately.",
    "This consultation is not a clinical evaluation or treatment.",
  ],
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

// The slim bar above the header. One clear message, no motion.
export const announcement = {
  text: "Now accepting new patients in Kansas",
  linkLabel: "Book a free 15-minute consultation",
  to: "/contact",
};

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
    desc: "A careful, unhurried assessment of your history, symptoms and goals. Everything that follows is built on it.",
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
    a: "Bliss Mind is currently a self-pay practice. Sessions are $200 per hour, and the initial 15-minute consultation is free. If you are self-paying you are entitled to a Good Faith Estimate of your costs before you begin. Just ask.",
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
    a: "Yes. What you discuss in your appointments is confidential and protected. Please note the contact form on this site is not a secure channel, so keep it to your contact details. We will discuss anything clinical with you directly.",
  },
];

export const crisis = {
  note: "If you are in crisis or this is a medical emergency, do not use this site.",
  line: "Call or text 988 for the Suicide & Crisis Lifeline, or dial 911.",
};
