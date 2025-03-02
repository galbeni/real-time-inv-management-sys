<template>
  <tr :class="[
      { stale: isStale },
      'text-sm text-gray-700'
    ]">
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
    <td>
      <span v-if="isStale">
        <button
          class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 border border-gray-500 rounded"
          @click="$emit('refresh', product.id)"
        >{{ $t('synchronize') }}</button>
      </span>
      <span v-else>{{ $formatDate(product.lastUpdated) }}</span>
    </td>
    <td>
      <quantity-controls
        :quantity="product.quantity"
        @update="(newQuantity) => handleQuantityUpdate(newQuantity)"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
  import QuantityControls from '../QuantityControls.vue';
  import type { Product } from '~/mocks/products';

  const props = defineProps({
    product: {
      type: Object as PropType<Product>,
      required: true
    },
    isStale: {
      type: Boolean,
      required: true
    }
  });

  // Define the emits
  const emit = defineEmits(['refresh', 'update-quantity']);

  // Handle quantity update and properly emit it
  const handleQuantityUpdate = (newQuantity: number) => {
    emit('update-quantity', { id: props.product.id, newQuantity });
  };
</script>

<style lang="scss" scoped>
  tr td {
    padding: 10px;
  }

  tr.stale {
    background-color: #fff3cd; // Background color for stale products
  }
</style>