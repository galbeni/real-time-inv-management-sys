<template>
  <div>
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </div>
</template>

<style lang="scss">
  .component-enter-active,
  .component-leave-active {
    transition: all 1s ease;
  }

  .component-enter-from,
  .component-leave-to {
    transform: translateY(30px);
    opacity: 0;
  }
</style>