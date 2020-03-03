<template>
  <section class="app-carousel" :id="id">
    <span
      class="visuallyhidden"
      aria-live="polite"
      aria-atomic="true"
    >
      Slide {{ currentIndex + 1 }} of {{ items.length }}
    </span>

    <div class="carousel-wrapper">
      <v-touch
        tag="div"
        @panstart="onPanStart"
        @panmove="onPanMove"
        @panend="onPanEnd"
        :class="['carousel-inner', { 'is-moving': isAnimating }]"
        :style="{ transform: cssTransform }"
      >
        <slot />
      </v-touch>
    </div>

    <ul v-if="showDots" class="carousel-dots">
      <li v-for="(dot, index) of items" :key="'carousel-dot-' + index">
        <button
          @click="onShowSlide(index)"
          :aria-controls="id"
          :aria-selected="!!(currentIndex === index)"
          :class="{ active: currentIndex === index }"
        >
          <span class="visuallyhidden">Slide {{ index }}</span>
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'Carousel',

    props: {
      id: { type: String, default: () => 'app-carousel' },
      showDots: { type: Boolean, default: true }
    },

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
      items () {
        return this.$slots.default
      },
      currentIndex () {
        return -1 * this.currentPosition / this.movementSize
      },
      cssTransform () {
        const translateValue = this.isAnimating
          ? this.interactPosition.x + this.currentPosition
          : this.currentPosition
        return `translate3D(${translateValue}%, 0, 0)`
      },
      isFirstItem () {
        return this.currentPosition === 0 && this.interactPosition.x > 0
      },
      isLastItem () {
        const maxItems = this.items.length - 1
        return (
          this.currentIndex === maxItems &&
          this.interactPosition.x < 0
        )
      }
    },

    mounted () {
      this.setFocus()
    },

    methods: {
      setPosition ({ x }) {
        this.interactPosition = { x }
      },
      setFocus () {
        const $el = this.items[this.currentIndex]
        if ($el) {
          $el.elm.focus()
        }
      },
      onShowSlide (index) {
        this.isAnimating = true
        this.currentPosition = -1 * index * this.movementSize
        this.isAnimating = false
      },
      onPanStart () {
        this.isAnimating = true
      },
      onPanMove (event) {
        this.setPosition({
          x: this.interactPosition.x + event.velocityX * 2.5
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

        this.setFocus()
      }
    }
  }
</script>

<style lang="postcss">
  .app-carousel {
    width: 100%;
    position: relative;
  }

  .app-carousel .carousel-wrapper {
    overflow: hidden;
    width: 100%;
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
      flex: 0 0 100%;
    }
  }

  .app-carousel .carousel-dots {
    list-style: none;
    display: flex;
    justify-content: center;
    margin-top: var(--base-gap);

    & li:not(:last-child) {
      margin-right: calc(var(--base-gap) / 2);
    }

    & li button {
      --button-background: var(--dark-grey);
      --button-shadow: none;
      --button-padding: 0;
      border-radius: 50%;
      width: 10px;
      height: 10px;

      &::after {
        display: none;
      }

      &.active {
        background: var(--brand-green);
        box-shadow: 0 2px 9px var(--brand-green-medium);
      }
    }
  }
</style>
