<template>
  <div class="flex justify-end items-center gap-x-1.5">
    <button
      type="button"
      class="size-6 inline-flex justify-center items-center rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50"
      tabindex="-1"
      :aria-label="$t('decrease')"
    >
      <svg-icon
        name="minus"
        class="size-3"
      />
    </button>
    <button
      type="button"
      class="size-6 inline-flex justify-center items-center rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50"
      tabindex="-1"
      :aria-label="$t('increase')"
    >
      <svg-icon
        name="plus"
        class="size-3"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
// here we'll define the props that the component will receive
// here we'll define the logic for the component
</script>

<style lang="scss" scoped></style>