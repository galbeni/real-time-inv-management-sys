<template>
  <tbody class="divide-y divide-gray-100">
    <product-table-row
      v-for="item in data"
      :key="item.id"
      :product="item"
    />
  </tbody>
</template>

<script setup lang="ts">
  import type { Product } from '~/mocks/products';

  defineProps({
    data: {
      type: Array as PropType<Product[]>,
      required: true
    }
  });
</script>

<style lang="scss" scoped></style>