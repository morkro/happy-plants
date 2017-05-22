<template>
  <section>
    <h1>Growing seasons</h1>
    <!-- TODO: implement logic -->
    <p v-if="true">
      Your plant is currently in <strong>active growth</strong>1
    </p>
    <p v-else>
      Your plant is currently in a dormant phase.
    </p>
    <ul class="season-list">
      <li
        v-for="(season, index) of seasons"
        :class="{ current: isCurrentMonth(index), growth: season.growth }">
        {{ season.month[0] }}
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'PlantSeasons',
    props: {
      seasons: { type: Array, default: [] }
    },
    methods: {
      isCurrentMonth (month) {
        return month === new Date().getMonth()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  section {
    width: 100%;
    background: $background-primary;
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
