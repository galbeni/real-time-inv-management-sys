<template>
  <tr class="text-sm text-gray-700">
    <td class="font-bold">{{ product.id }}.</td>
    <td>
      <img
        class="size-12 flex-none rounded-full bg-gray-50"
        :src="product.imageUrl"
        :alt="product.name"
      />
    </td>
    <td>{{ product.name }}</td>
    <td>{{ product.quantity }}</td>
    <td>{{ $formatDate(product.lastUpdated) }}</td>
    <td>
      <quantity-controls />
    </td>
  </tr>
</template>

<script setup lang="ts">
import QuantityControls from '../QuantityControls.vue';
import type { Product } from '~/mocks/products';

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
});
</script>

<style lang="scss" scoped>
  tr td {
    padding: 10px;
  }
</style>