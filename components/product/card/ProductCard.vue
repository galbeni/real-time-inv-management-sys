<template>
  <div class="bg-white space-y-3 p-4 rounded-lg shadow">
    <div>
      <img
        class="size-12 flex-none rounded-full bg-gray-50"
        :src="data.imageUrl"
        :alt="data.name"
      />
    </div>
    <div class="flex items-center space-x-2 text-sm">
      <span class="font-bold">{{ `${$t('ID')}: ${data.id}` }}</span>
    </div>
    <div class="text-sm text-gray-700">
      {{ data.name }}
    </div>
    <div class="flex justify-between items-center gap-x-1.5">
      <div class="text-xs text-gray-700">
        {{ $formatDate(data.lastUpdated) }}
      </div>
      <div class="flex gap-x-1.5 items-center">
        <div class="text-sm font-medium text-black">
          {{ data.quantity }} {{ $t('pieces') }}
        </div>
        <quantity-controls />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import QuantityControls from '../QuantityControls.vue';
  import type { Product } from '~/mocks/products';

  defineProps({
    data: {
      type: Object as PropType<Product>,
      required: true
    }
  });
</script>

<style lang="scss" scoped></style>