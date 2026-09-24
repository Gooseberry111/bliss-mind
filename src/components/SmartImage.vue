<template>
  <span ref="root" :class="['relative block overflow-hidden', rounded]">
    <!-- Shimmer placeholder, removed the moment the image is decoded. -->
    <span
      v-if="!loaded"
      :class="['skeleton absolute inset-0', rounded]"
      aria-hidden="true"
    ></span>

    <img
      :src="src"
      :srcset="srcset || undefined"
      :sizes="sizes || undefined"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
      :class="[
        'transition-opacity duration-500 ease-out',
        loaded ? 'opacity-100' : 'opacity-0',
        imgClass,
      ]"
      @load="loaded = true"
      @error="loaded = true"
    />
  </span>
</template>

<script setup>
import { onMounted, ref } from "vue";

defineProps({
  src: { type: String, required: true },
  srcset: { type: String, default: "" },
  sizes: { type: String, default: "" },
  alt: { type: String, default: "" },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined },
  // Applied to both the wrapper and the skeleton so the placeholder matches
  // the final shape, e.g. "rounded-full".
  rounded: { type: String, default: "" },
  imgClass: { type: String, default: "h-full w-full object-cover" },
  eager: { type: Boolean, default: false },
});

const loaded = ref(false);
const root = ref(null);

onMounted(() => {
  // A cached image can finish decoding before the load listener attaches,
  // which would otherwise leave the skeleton up forever.
  const img = root.value?.querySelector("img");
  if (img?.complete && img.naturalWidth > 0) loaded.value = true;
});
</script>
