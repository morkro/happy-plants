<template>
  <main>
    <app-header :settings="true">
      <h1 slot="title">Happy Plants</h1>
    </app-header>

    <section>
      <div v-if="plants.length <= 0">
        <p>Looks like you haven't added any plants yet.</p>
      </div>

      <ul v-if="plants.length" class="plant-list">
        <li v-for="plant in plants">
          <plant-preview
            @delete-plant="deleteElementFromList"
            :configMode="filter"
            :guid="plant.guid"
            :name="plant.scientific"
            :imageURL="plant.imageURL"
          />
        </li>
      </ul>

      <footer>
        <router-link :to="{ path: 'plant/add' }" class="add-plant circle" tag="button">
          <svg width="20px" height="30px" viewBox="0 0 20 30">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-178.000000, -595.000000)" stroke="#fff" stroke-width="0.5" fill="#fff" fill-rule="nonzero">
                <g transform="translate(157.000000, 579.000000)">
                  <g transform="translate(22.000000, 17.000000)">
                    <path d="M9.50889908,0.238191033 C9.25266055,-0.0793606238 8.80431193,-0.0793606238 8.54807339,0.238191033 C8.16374312,0.682752437 0.0289541284,10.3366394 0.0289541284,15.7987135 C0.0289541284,21.0067135 3.74405505,23.4837037 7.26699083,24.0553294 C7.90761468,24.1823392 8.3559633,24.6904327 8.3559633,25.3255361 L8.3559633,27.3579103 C8.3559633,27.7389942 8.61220183,27.9930136 8.99647706,27.9930136 C9.38075229,27.9930136 9.63699083,27.7389396 9.63699083,27.3579103 L9.63699083,25.3255361 C9.63699083,24.0552749 8.74023853,23.0390877 7.45915596,22.7850682 C6.04998165,22.5309942 1.3100367,21.3242651 1.3100367,15.7987135 C1.3100367,11.4798908 7.20297248,3.85837817 8.99642202,1.69899415 C10.7899266,3.85843275 16.6828073,11.4798908 16.6828073,15.7987135 C16.6828073,20.4986199 13.8003853,22.1499649 11.4304404,22.7215361 C11.1101835,22.7850682 10.853945,23.1660975 10.9180183,23.4837037 C10.9820917,23.8012554 11.366367,24.0553294 11.6866789,23.9917973 C15.7220367,23.1026199 17.9638899,20.1810682 17.9638899,15.8622456 C17.963945,10.3366394 9.82921101,0.682752437 9.50889908,0.238191033 Z" id="Shape"></path>
                  </g>
                  <g transform="translate(27.000000, 28.000000)">
                    <polygon id="Shape" points="8 3.33333333 4.66666667 3.33333333 4.66666667 0 3.33333333 0 3.33333333 3.33333333 0 3.33333333 0 4.66666667 3.33333333 4.66666667 3.33333333 8 4.66666667 8 4.66666667 4.66666667 8 4.66666667"></polygon>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </router-link>
      </footer>
    </section>
  </main>
</template>

<script>
  import localforage from 'localforage'
  import blobUtil from 'blob-util'
  import AppHeader from '@/components/AppHeader'
  import PlantPreview from '@/components/PlantPreview'

  export default {
    name: 'PlantsList',
    components: {
      'app-header': AppHeader,
      'plant-preview': PlantPreview
    },
    methods: {
      toggleFilter () {
        this.filter = !this.filter
      },
      deleteElementFromList (guid) {
        localforage.removeItem(`plant-${guid}`)
          .then(() => {
            this.plants = this.plants.filter(p => p.guid !== guid)
          })
      }
    },
    beforeRouteEnter (to, from, next) {
      /**
       * 1. Grab all entries starting with 'plant-'
       * 2. Load each entry from IndexedDB
       * 3. Modify entries with an image URL from blob
       * 4. Pass callback to `then`
       */
      localforage.keys()
        .then(keys =>
          keys.filter(k => k.startsWith('plant-')))
        .then(keys =>
          Promise.all(keys.map(p => localforage.getItem(p))))
        .then(plants =>
          plants.map(p => ({
            ...p,
            imageURL: blobUtil.createObjectURL(p.blob)
          })))
        .then(plants => next(vm => { vm.plants = plants }))
    },
    data () {
      return {
        plants: [],
        filter: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  $list-gap: ($base-gap * 2) - $base-gap / 2;
  $footer-btn-size: 60px;
  $header-size: 50px;

  main {
    min-height: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: $light-grey;
    padding-top: $header-size;
  }

  section {
    height: 100%;
    padding: $base-gap $base-gap ($footer-btn-size + ($base-gap * 2));
  }

  .header-controls {
    display: flex;

    button {
      margin-right: $base-gap;
    }

    .active svg {
      fill: black;
    }
  }

  section footer {
    position: fixed;
    bottom: $base-gap;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;

    .add-plant {
      width: $footer-btn-size;
      height: $footer-btn-size;
    }
  }

  .plant-list {
    list-style: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    --list-gap: ($base-gap * 2) - $base-gap / 2;

    li {
      width: calc(50vw - var(--list-gap));
      height: calc(50vw - var(--list-gap));
      margin-bottom: $base-gap;
      box-shadow: 0px 1px 12px rgba(0, 0, 0, .1);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
