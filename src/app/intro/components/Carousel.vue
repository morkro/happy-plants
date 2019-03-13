<template>
  <section class="app-carousel">
    <v-touch
      tag="div"
      @panstart="onPanStart"
      @panmove="onPanMove"
      @panend="onPanEnd"
      :class="['carousel-inner', { 'is-moving': isAnimating }]"
      :style="{ transform: cssTransform }">
      <slot/>
    </v-touch>
  </section>
</template>

<script>
  export default {
    name: 'Carousel',

    data: () => ({
      isAnimating: false,
      currentPosition: 0,
      movementSize: 100,
      interactThreshold: {
        x: 15
      },
      interactPosition: {
        x: 0
      }
    }),

    computed: {
      cssTransform () {
        const translateValue = this.isAnimating ? this.interactPosition.x + this.currentPosition : this.currentPosition
        return `translate3D(${translateValue}%, 0, 0)`
      },
      isFirstItem () {
        return this.currentPosition === 0 && this.interactPosition.x > 0
      },
      isLastItem () {
        const maxElements = this.$slots.default.length - 1
        return (
          (this.currentPosition / this.movementSize) * -1 === maxElements &&
          this.interactPosition.x < 0
        )
      }
    },

    methods: {
      setPosition ({ x }) {
        this.interactPosition = { x }
      },
      onPanStart () {
        this.isAnimating = true
      },
      onPanMove (event) {
        this.setPosition({
          x: this.interactPosition.x + event.velocityX * 2
        })
      },
      onPanEnd () {
        this.isAnimating = false

        if (this.isFirstItem || this.isLastItem) {
          this.setPosition({ x: 0 })
          return
        }

        if (this.interactPosition.x > this.interactThreshold.x) {
          this.currentPosition += this.movementSize
          this.setPosition({ x: 0 })
        } else if (this.interactPosition.x < -this.interactThreshold.x) {
          this.currentPosition -= this.movementSize
          this.setPosition({ x: 0 })
        } else {
          this.setPosition({ x: 0 })
        }
      }
    }
  }
</script>

<style lang="postcss">
  .app-carousel {
    width: 100%;
    height: 30vh;
    position: relative;
    overflow: hidden;
  }

  .app-carousel .carousel-inner {
    width: 100%;
    height: 100%;
    display: flex;
    transition-timing-function: ease-in-out;
    transition-duration: 150ms;

    &.is-moving {
      transition-duration: 0ms;
    }

    & > * {
      width: 100vw;
      height: 100%;
      flex: 0 0 100%;
    }
  }
</style>
