<template>
  <div class="overflow-auto rounded-lg shadow hidden lg:block">
    <table :class="classes">
      <table-header :headers="headers" />
      <table-body
        :data="data"
        :stale-products="staleProducts"
        :conflicted-products="conflictedProducts"
        @refresh="$emit('refresh', $event)"
        @update-quantity="updateQuantity"
        @force-update="$emit('force-update', $event)"
      />
    </table>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
    <product-card
      v-for="item in data"
      :key="item.id"
      :data="item"
      :is-stale="staleProducts.has(item.id)"
      :is-conflict="conflictedProducts.has(item.id)"
      @refresh="$emit('refresh', $event)"
      @update-quantity="updateQuantity(item.id, $event.newQuantity)"
      @force-update="$emit('force-update', $event)"
    />
  </div>
</template>

<script setup lang="ts">
  import ProductCard from '../card/ProductCard.vue';
  import TableBody from './TableBody.vue';
  import TableHeader from './TableHeader.vue';
  import type { Header, Product } from '~/mocks/products';

  defineProps({
    headers: {
      type: Array as PropType<Header[]>,
      required: true
    },
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
    },
    classes: {
      type: String,
      default: ''
    }
  });

  // Define the emits
  const emit = defineEmits(['refresh', 'update-quantity', 'force-update']);

  // Handle quantity update and properly emit it
  const updateQuantity = (id: number, newQuantity: number) => {
    emit("update-quantity", id, newQuantity);
  };
</script>

<style lang="scss" scoped></style>