<template>
  <section>
    <header>
      <h3>Growing seasons</h3>
      <p v-if="isGrowthMonth()">
        Your plant is currently in <strong>active growth</strong>.
      </p>
      <p v-else>
        Your plant is currently in a <strong>dormant phase</strong>.
      </p>
    </header>
    <ul @click="emitStateToggle" class="season-list">
      <li
        v-for="(season, index) of seasons"
        :class="{ current: isCurrentMonth(index), growth: season.growth }"
        :data-season="season.month">
        {{ season.month[0] }}
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'PlantSeasons',

    props: {
      seasons: {
        type: Array,
        default: []
      }
    },

    methods: {
      isCurrentMonth (month) {
        return month === new Date().getMonth()
      },
      isGrowthMonth () {
        return this.seasons[new Date().getMonth()].growth
      },
      emitStateToggle (event) {
        if (event.target.nodeName !== 'LI') return
        this.$emit('toggle-season', event.target.getAttribute('data-season'))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/variables";

  section {
    width: 100%;
    background: $background-primary;
    padding: $base-gap;
  }

  header {
    margin-bottom: $base-gap;
  }

  .season-list {
    list-style: none;
    display: flex;
    justify-content: space-between;

    li {
      color: darken($grey, 30);
      background: $grey;
      border-radius: $border-radius;
      height: calc(100vw / 12 + 6px);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background $base-speed $ease-out-back,
                  color $base-speed $ease-out-back;

      &:not(:last-child) {
        margin-right: 1px;
      }

      &.growth {
        color: $green;
        background: lighten($green, 30);
      }

      &.growth.current {
        color: white;
        background: $green;
      }

      &.current {
        font-weight: 600;
        box-shadow: $shadow;
        transform: scale(1.2);
      }
    }
  }
</style>
