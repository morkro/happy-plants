<template>
  <section>
    <svgicon
      class="preview-icon"
      icon="cactus"
      :width="iconSize"
      :height="iconSize"
      color="#fff">
    </svgicon>
    <p>
      Looks like you haven't added any friends yet.<br />
      Tap on the bottom button to start!
    </p>
  </section>
</template>

<script>
  import '@/assets/cactus'
  export default {
    name: 'PlantsIntro',

    data () {
      return {
        iconSize: '140'
      }
    }
  }
</script>

<style lang="scss" scoped>
  section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      color: var(--text-color-secondary);
      text-align: center;
      font-weight: 600;
      margin-top: var(--base-gap);
    }
  }

  .preview-icon {
    opacity: 0.1;
  }
</style>
