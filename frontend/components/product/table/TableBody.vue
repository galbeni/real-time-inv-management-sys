<template>
  <tbody class="divide-y divide-gray-100">
    <product-table-row
      v-for="item in data"
      :key="item.id"
      :product="item"
      :is-stale="staleProducts.has(item.id)"
      :is-conflict="conflictedProducts.has(item.id)"
      @refresh="$emit('refresh', $event)"
      @update-quantity="(event) => $emit('update-quantity', event.id, event.newQuantity)"
      @force-update="$emit('force-update', $event)"
    />
  </tbody>
</template>

<script setup lang="ts">
  import type { Product } from '~/mocks/products';

  defineProps({
    data: {
      type: Array as PropType<Product[]>,
      required: true
    },
    staleProducts: {
      type: Object as PropType<Set<number>>,
      required: true
    },
    conflictedProducts: {
      type: Object as PropType<Set<number>>,
      required: false,
      default: () => new Set()
    }
  });
  
  // Define the emits
  defineEmits(['refresh', 'update-quantity', 'force-update']);
</script>

<style lang="scss" scoped></style>