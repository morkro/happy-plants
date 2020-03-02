<template>
  <section class="page-section">
    <wave-border
      v-if="waveBorder"
      :color="waveColor"
    />
    <div class="page-section-inner">
      <slot />
    </div>
  </section>  
</template>

<script>
  export default {
    name: 'PageSection',

    props: {
      waveBorder: { type: Boolean, default: false },
      waveColor: { type: String, default: 'white' }
    }
  }
</script>

<style lang="postcss" scoped>
  .page-section {
    width: 100vw;
    min-height: 30vh;
    position: relative;
    padding:
      calc(var(--base-gap) * 6)
      var(--base-gap);

    & .page-section-inner {
      width: 100%;
      max-width: var(--max-page-width);
      margin: 0 auto;
      padding: 0 var(--base-gap);
      position: relative;
      z-index: 1;

      & h1 {
        text-align: center;
      }
    }
  }
</style>
