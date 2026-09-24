import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

// Home is eagerly imported since it is the most common entry point;
// the rest are split into their own chunks.
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "",
      description:
        "Virtual psychiatric care in Kansas with Dr. Jemimah Ukata, PMHNP. Anxiety, depression, ADHD, PTSD, OCD, sleep and postpartum care. Free 15-minute consultation.",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/About.vue"),
    meta: {
      title: "About",
      description:
        "Meet Dr. Jemimah Ukata, PMHNP, the psychiatric mental health nurse practitioner behind Bliss Mind, and the principles that guide her care.",
    },
  },
  {
    path: "/services",
    name: "services",
    component: () => import("../pages/Services.vue"),
    meta: {
      title: "Services",
      description:
        "Psychiatric evaluation, medication management and ongoing support for anxiety, depression, ADHD, PTSD, OCD, sleep disorders and postpartum depression.",
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../pages/Contact.vue"),
    meta: {
      title: "Contact",
      description:
        "Book a free 15-minute consultation with Bliss Mind, or request a callback. Virtual psychiatric care for adults across Kansas.",
    },
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import("../pages/Privacy.vue"),
    meta: {
      title: "Privacy Policy",
      description:
        "What the Bliss Mind website collects, why, and what happens to it.",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../pages/NotFound.vue"),
    meta: { title: "Page Not Found", robots: "noindex" },
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});
