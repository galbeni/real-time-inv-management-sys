<template>
  <div>
    <h1 class="text-center pb-5">{{ $t('title') }}</h1>
    <transition
      name="component"
      appear
    >
      <div>
        <product-table
          classes="w-full" 
          :headers="tableHeaders"
          :data="products"
          :stale-products="staleProducts"
          @refresh="synchronizeProduct"
          @update-quantity="updateQuantity"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { useSocket } from "~/composables/useSocket";
  import ProductTable from '~/components/product/table/ProductTable.vue';
  import { tableHeaders } from '~/mocks/products';
  import type { Product } from '~/mocks/products';

  const backendUrl = import.meta.env.VITE_BACKEND_URL as string; // Vite-environment variable for backend URL

  const { socket } = useSocket(); // WebSocket instance

  interface Row {
    id: number;
  }

  const products = ref<Product[]>([]); // All products
  const staleProducts = ref(new Set<number>()); // Track outdated rows

  // Fetch all products from API
  const fetchAllProducts = async () => {
    try {
      products.value = await $fetch<Product[]>(`${backendUrl}/api/rows`);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // Refresh a specific product by id when clicking the synchronize button
  const synchronizeProduct = async (id: number) => {
    try {
      const index = products.value.findIndex((item) => item.id === id); // Find product index
      if (index === -1) return; // If not found, exit

      // API request: Update server with client-side quantity
      const updatedProduct = await $fetch<Product>(`${backendUrl}/api/rows/${id}`);

      // If successful, update the product with the server response
      // (since the server has already updated the quantity, the lastUpdated is also updated)
      // (we also remove the stale state)
      products.value[index] = updatedProduct;
      staleProducts.value.delete(id); // Remove stale state
    } catch (err) {
      console.error(`Failed to synchronize product ${id}:`, err);
    }
  };

  const locallyUpdatedProducts = ref(new Set<number>()); // Track locally updated rows

  // Optimistically update quantity, then send API request
  const updateQuantity = async (id: number, newQuantity: number) => {
    const index = products.value.findIndex((item) => item.id === id); // Find product index
    if (index === -1) return; // If not found, exit

    products.value[index].quantity = newQuantity; // Optimistically update quantity

    // We add the ID to the list of locally updated products
    // (we use this list to distinguish our own modifications from those received from others)
    // (if the product ID is in the list, we made the modification, so we DO NOT MARK it as stale)
    locallyUpdatedProducts.value.add(id);

    // API request: Update server with new quantity
    try {
      await $fetch(`${backendUrl}/api/rows/${id}`, {
        method: "PUT",
        body: {
          quantity: newQuantity,
        }
      });
    } catch (err: any) {
      if (err.response?.status === 409) {
        staleProducts.value.add(id); // Mark as stale
      } else {
        console.error(`Failed to update quantity for ${id}:`, err);
      }
    }
  };

  // Fetch all rows from API on component mount & watch for WebSocket events
  onMounted(() => {
    fetchAllProducts();

    socket.on("rowUpdated", (payload: { id: number, lastUpdated: string }) => {
      console.log('WebsSocket: Received update for ID:', payload.id);

      const product = products.value.find((item) => item.id === payload.id); // Find product by ID
      
      if (!product) return; // If product not found, exit

      // If the product ID is in the list of local modifications, we made this modification, so we DO NOT MARK it as stale
      if (locallyUpdatedProducts.value.has(payload.id)) {
        locallyUpdatedProducts.value.delete(payload.id); // Remove from locally updated products
        return;
      }

      // If someone else modified it (e.g. in Postman), it gets a stale state
      staleProducts.value.add(payload.id);
    });
  });
</script>

<style lang="scss" scoped></style>