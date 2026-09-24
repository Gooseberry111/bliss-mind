<template>
  <img
    :src="variant === 'avatar' ? avatarSrc : portraitSrc"
    :alt="`${provider.name}, ${provider.credentials}`"
    :width="variant === 'avatar' ? 640 : 800"
    :height="variant === 'avatar' ? 640 : 1000"
    loading="lazy"
    decoding="async"
    :class="
      variant === 'avatar'
        ? 'rounded-full object-cover'
        : 'h-full w-full object-cover'
    "
  />
</template>

<script setup>
import avatarSrc from "../assets/brand/provider-avatar.webp";
import portraitSrc from "../assets/brand/provider-portrait.webp";
import { provider } from "../data/site.js";

defineProps({
  // "avatar" = square crop framed on the face, for circular use
  // "card"   = 4:5 crop that fills its container
  variant: {
    type: String,
    default: "card",
    validator: (v) => ["avatar", "card"].includes(v),
  },
});
</script>
