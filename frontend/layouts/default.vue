<template>
  <div>
    <section class="px-2 py-32 bg-white md:px-0">
      <div class="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <nuxt-link
          to="/"
          class="flex justify-center py-5"
        >
          <img
            src="/assets/images/inventory-system-logo.webp"
            alt=""
            class="logo"
          />
        </nuxt-link>
        <slot />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .logo {
    width: 100%;
    max-width: 300px;
  }
</style>