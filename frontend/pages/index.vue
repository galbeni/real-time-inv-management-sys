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

  interface Row {
    id: number;
    // Add other properties of Row here
  }

  const rows = ref<Row[]>([]);
  const staleRows = ref(new Set()); // Track outdated rows

  // Fetch all rows from API
  const fetchAllData = async () => {
    try {
      rows.value = await $fetch("http://localhost:4000/api/rows");
      console.log("Fetched all data:", rows.value[4].id);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  // Fetch updated data for a single row
  const refreshRow = async (id: number) => {
    try {
      const updatedRow = await $fetch(`http://localhost:4000/api/rows/${id}`);
      const index = rows.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        rows.value[index] = updatedRow as Row;
      }
      staleRows.value.delete(id);
    } catch (err) {
      console.error(`Failed to refresh row ${id}:`, err);
    }
  };

  // Fetch all rows from API on component mount
  onMounted(() => {
    fetchAllData();
  });
</script>

<style lang="scss" scoped></style>