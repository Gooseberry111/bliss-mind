<template>
  <SmartImage
    :src="variant === 'avatar' ? avatarSrc : portraitSrc"
    :alt="`${provider.name}, ${provider.credentials}`"
    :width="variant === 'avatar' ? 640 : 800"
    :height="variant === 'avatar' ? 640 : 1000"
    :rounded="variant === 'avatar' ? 'rounded-full' : ''"
    :class="variant === 'avatar' ? '' : 'h-full w-full'"
  />
</template>

<script setup>
import SmartImage from "./SmartImage.vue";
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
