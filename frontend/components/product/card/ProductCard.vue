<template>
  <div :class="[
    { stale: isStale },
    'bg-white space-y-3 p-4 rounded-lg shadow'
  ]">
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
      <div class="text-gray-700">
        <span
          v-if="isStale"
          class="text-sm"
        >
          <button
            class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-2 mr-2 border border-gray-500 rounded"
            @click="$emit('refresh', data.id)"
          >{{ $t('synchronize') }}</button>

          <button
            v-if="isConflict"
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-2 border border-red-600 rounded"
            @click="$emit('force-update', { id: data.id, newQuantity: data.quantity })"
          >{{ $t('forceSave') }}</button>
        </span>
        <span
          class="text-xs"
          v-else
        >{{ data.lastSynchronized ? $formatDate(data.lastSynchronized) : '-' }}</span>
      </div>
      <div class="flex gap-x-1.5 items-center">
        <div class="text-sm font-medium text-black min-w-10">
          {{ data.quantity }} {{ $t('pieces') }}
        </div>
        <quantity-controls
          :quantity="data.quantity"
          @update="(newQuantity) => handleQuantityUpdate(newQuantity)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import QuantityControls from '../QuantityControls.vue';
  import type { Product } from '~/mocks/products';

  const props = defineProps({
    data: {
      type: Object as PropType<Product>,
      required: true
    },
    isStale: {
      type: Boolean,
      required: true
    },
    isConflict: {
      type: Boolean,
      required: false,
      default: false
    }
  });

  // Define the emits
  const emit = defineEmits(['refresh', 'update-quantity', 'force-update']);

  // Handle quantity update and properly emit it
  const handleQuantityUpdate = (newQuantity: number) => {
    emit('update-quantity', { id: props.data.id, newQuantity });
  };
</script>

<style lang="scss" scoped>
  .stale {
    background-color: #fff3cd;
  }
</style>