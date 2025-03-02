<template>
  <div>
    <section class="px-2 py-32 bg-white md:px-0">
      <div class="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <nuxt-link
          to="/"
          class="flex justify-center py-5"
        >
          <svg-icon
            name="antavo-logo"
            class="antavo-logo"
          />
        </nuxt-link>
        <slot />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .antavo-logo {
    width: 100%;
    max-width: 200px;
    height: 58px;
  }
</style>