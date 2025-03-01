<template>
  <thead class="bg-gray-50 border-b-2 border-gray-200">
    <tr>
      <th
        v-for="(item, index) in headers"
        :key="index"
        :class="[
          item.classes,
          `p-3 text-sm tracking-wide text-left`
        ]"
      >
        {{ item.name }}
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
  import type { Header } from '~/mocks/products';

  defineProps({
    headers: {
      type: Array as PropType<Header[]>,
      required: true
    }
  });
</script>

<style lang="scss" scoped></style>