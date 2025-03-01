<template>
  <div>
    <h1 class="text-center pb-5">{{ $t('title') }}</h1>
    <transition
      name="component"
      appear
    >
      <div>
        <product-table
          :headers="tableHeaders"
          :data="products"
          classes="w-full"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import ProductTable from '~/components/product/table/ProductTable.vue';
  import { tableHeaders, products } from '~/mocks/products';
</script>

<style lang="scss" scoped></style>