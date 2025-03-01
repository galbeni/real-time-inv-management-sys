<template>
  <div class="overflow-auto rounded-lg shadow hidden lg:block">
    <table :class="classes">
      <table-header :headers="headers" />
      <table-body :data="data" />
    </table>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
    <product-card
      v-for="item in data"
      :key="item.id"
      :data="item"
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
    classes: {
      type: String,
      default: ''
    }
  });
</script>

<style lang="scss" scoped></style>