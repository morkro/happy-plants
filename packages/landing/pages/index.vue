<template>
  <div>
    <page-section class="section-introduction" aria-labelledby="introduction-heading">
      <div class="introduction-screenshot">
        <v-device>
          <picture class="screenshot-overview">
            <img
              src="~/assets/app-screenshot-overview.png"
              alt="Screenshot of Overview screen"
            >
          </picture>

          <!-- <picture class="screenshot-plant">
            <img
              src="~/assets/app-screenshot-plant.png"
              alt="Screenshot of Plant screen"
            >
          </picture>

          <picture class="screenshot-settings">
            <img
              src="~/assets/app-screenshot-settings.png"
              alt="Screenshot of Settings screen"
            >
          </picture> -->
        </v-device>
      </div>

      <div class="introduction-content">        
        <v-typography id="introduction-heading" variant="headline">
          Your own houseplant database
        </v-typography>

        <v-typography>
          HappyPlants is all about creating a visual and helpful collection of your houseplants.
        </v-typography>

        <ul>
          <li @click="scrollToModule('watering')">
            <feather-droplet />
            <v-typography>How much water does it need?</v-typography>
          </li>
          <li @click="scrollToModule('seasons')">
            <feather-moon />
            <v-typography>
              During which seasons does it grow? <span class="desktop-only">When is it dormant?</span>
            </v-typography>
          </li>
          <li @click="scrollToModule('sunshine')">
            <feather-sun />
            <v-typography>Does it require lots of sun?</v-typography>
          </li>
        </ul>

        <v-button
          color="yellow"
          tag="a"
          href="https://happyplants.garden"
          target="_blank"
          rel="noopener"
        >
          <template v-slot:icon>
            <feather-smartphone />
          </template>
          Open application
        </v-button>

        <v-typography variant="sidenote" class="introduction-disclaimer">
          Open Source, free to use, no "download my app", just a website.
        </v-typography>
      </div>
    </page-section>

    <page-section
      class="section-what"
      aria-labelledby="what-heading"
      :wave-border="true"
    >
      <div class="what-inner">
        <v-typography id="what-heading" variant="headline">
          What is HappyPlants?
        </v-typography>

        <v-typography>
          HappyPlants is free, open source web application focused to help you keeping track of your houseplants.
          The aim is to allow as much freedom as possible for structuring and organising your happy friends.
          <br>
          <br>
          It started as a personal side-project to gather all the individual care requirements each of my houseplants have,
          and grew over time into an app with galleries, tagging, and multi-device storage.
        </v-typography>
      </div>
    </page-section>

    <page-section
      class="section-features"
      aria-labelledby="features-heading"
    >
      <div class="features-inner">
        <v-typography
          id="features-heading"
          ref="featuresHeading"
          variant="headline"
        >
          Features
        </v-typography>

        <div class="features-list">
          <div class="features-list-item feature-modules">
            <div class="features-list-description">
              <v-typography variant="subline">
                Different modules 
              </v-typography>
              <v-typography>
                Use modules to visualise your plants individual requirements.
              </v-typography>
              <ul class="features-modules-selection">
                <li v-for="feature in featuredModules" :key="feature.name">
                  <v-button
                    type="circle"
                    :color="getModuleColor(feature.name)"
                    @click.native="selectModule(feature.name)"
                  >
                    <component :is="`feather-${feature.icon}`" />
                  </v-button>
                </li>
              </ul>
            </div>

            <div class="features-list-preview">
              <div :class="{ selected: isSelectModule('sunshine') }">
                <module-sunshine
                  :intensity="sunshine"
                  @update-plant="updateSunshineModule"
                />
              </div>

              <div :class="{ selected: isSelectModule('seasons') }">
                <module-seasons
                  :seasons="seasons"
                  @update-plant="updateSeasonsModule"
                />
              </div>

              <div :class="{ selected: isSelectModule('watering') }">
                <module-watering
                  :amount="waterAmount"
                  :frequency="waterFrequency"
                  @update-plant="updateWateringModule"
                />
              </div>
              
              <div :class="{ selected: isSelectModule('notes') }">
                <module-notes />
              </div>
            </div>
          </div>

          <div class="features-list-item feature-gallery">
            <div class="features-list-description">
              <v-typography variant="subline">
                A gallery!
              </v-typography>
              <v-typography>
                Upload photos over time to track progress and growth of your plant.
                Or simply keep a gallery of beautiful shots.
              </v-typography>
            </div>
            <div class="features-list-preview">
              <div class="gallery-wrapper">
                <ul>
                  <li v-for="(_, index) in new Array(9)" :key="`gallery-item-${index}`">
                    <v-box><feather-image /></v-box>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- <div class="features-list-item feature-tags">
            <div class="features-list-description">
              <v-typography variant="subline">
                Use tags to group your houseplants
              </v-typography>
              <v-typography>
                The tagging system helps you to categorise and filter your plants.
              </v-typography>
            </div>
            <div class="features-list-preview">
              <v-box>
                foo
              </v-box>
            </div>
          </div>

          <div class="features-list-item features-cloud">
            <div class="features-list-description">
              <v-typography variant="subline">
                Backup your data in the cloud
              </v-typography>
              <v-typography>
                Enable the cloud feature and you'll be able to use your accounts across multiple devices.
              </v-typography>
            </div>
            <div class="features-list-preview">
              <v-device type="phone">
                <lazy-image
                  :source="require('~/assets/app-screenshot-overview.png')"
                  alt="Screenshot of application phone"
                />
              </v-device>
              
              <v-device type="laptop">
                <lazy-image
                  :source="require('~/assets/app-screenshot-desktop.png')"
                  alt="Screenshot of application on desktop"
                />
              </v-device>
            </div>
          </div>  -->
        </div>

        <div class="features-roadmap">
          <v-typography variant="subline">
            Interested to know what features are coming?
          </v-typography>
          <v-button
            color="yellow"
            tag="a"
            href="https://github.com/morkro/happy-plants/projects/5"
            target="_blank"
            rel="noopener"
          >
            <template v-slot:icon>
              <feather-map />
            </template>
            Check out the roadmap!
          </v-button>
        </div>
      </div>
    </page-section>

    <!--<page-section
      class="section-faq"
      aria-labelledby="faq-heading"
    >
      <v-typography id="faq-heading" variant="headline">
        Frequently Asked Questions
      </v-typography>

      <ul class="faq-list">
        <li>
          <v-typography variant="subline">
            Foo
          </v-typography>
          <v-typography>
            Description
          </v-typography>
        </li>

        <li>
          <v-typography variant="subline">
            Foo
          </v-typography>
          <v-typography>
            Description
          </v-typography>
        </li>
      </ul>
    </page-section>-->
  </div>
</template>

<script>
  import {
    DropletIcon,
    SmartphoneIcon,
    SunIcon,
    MoonIcon,
    MapIcon,
    BookIcon,
    ImageIcon
  } from 'vue-feather-icons'
  import ModuleSunshine from '~/components/ModuleSunshine'
  import ModuleSeasons from '~/components/ModuleSeasons'
  import ModuleWatering from '~/components/ModuleWatering'
  import ModuleNotes from '~/components/ModuleNotes'
  
  const seasons = [
    'January', 'February', 'March',
    'April', 'Mai', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
  ]

  export default {
    components: {
      'module-sunshine': ModuleSunshine,
      'module-seasons': ModuleSeasons,
      'module-watering': ModuleWatering,
      'module-notes': ModuleNotes,
      'feather-smartphone': SmartphoneIcon,
      'feather-droplet': DropletIcon,
      'feather-sun': SunIcon,
      'feather-moon': MoonIcon,
      'feather-map': MapIcon,
      'feather-book': BookIcon,
      'feather-image': ImageIcon
    },

    data: () => ({
      highlightedModule: 'sunshine',
      featuredModules: [
        { name: 'sunshine', icon: 'sun', color: 'yellow' },
        { name: 'watering', icon: 'droplet', color: 'blue' },
        { name: 'seasons', icon: 'moon', color: 'default' },
        { name: 'notes', icon: 'book', color: 'grey' },
      ],
      sunshine: 2,
      seasons: seasons
        .map(month => ({ month, growth: false }))
        .map((month, index) => {
          const currentMonth = (new Date().getMonth() + 1)
          month.growth = (
            currentMonth === index ||
            currentMonth === index - 1 ||
            currentMonth === index + 1
          )
          return month
        }),
      waterAmount: 2,
      waterFrequency: 'weekly'
    }),

    methods: {
      selectModule (moduleName) {
        this.highlightedModule = moduleName
      },
      isSelectModule (moduleName) {
        return this.highlightedModule === moduleName
      },
      getModuleColor (moduleName) {
        let color = 'plain'
        
        if (this.isSelectModule(moduleName)) {
          const module = this.featuredModules.find(m => m.name === moduleName)
          color = module ? module.color : 'default'
        }
        
        return color
      },
      updateSunshineModule (event) {
        this.sunshine = event.level
      },
      updateSeasonsModule (event) {
        this.seasons = this.seasons.map(season => {
          if (event.month === season.month) {
            season.growth = !season.growth
          }
          return season
        })
      },
      updateWateringModule (event) {
        console.log(event)
      },
      scrollToModule (moduleName) {
        if (!this.$refs.featuresHeading) return

        this.$refs.featuresHeading.$el.scrollIntoView()
        this.selectModule(moduleName)
      }
    }
  }
</script>

<style lang="postcss">
  @custom-media --medium-viewport (max-width: 815px);

  .page-section.section-introduction {
    background: var(--brand-green);
    background-image: var(--topography-pattern);
    color: var(--text-color-inverse);
    padding-top: calc(var(--base-gap) * 8);

    @media (--medium-viewport) {
      & .desktop-only {
        display: none;
      }
    }

    &::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 0;
      opacity: 0.3;
    }

    & .page-section-inner {
      display: flex;
      position: relative;
      z-index: 1;

      @media (--medium-viewport) {
        text-align: center;
        flex-direction: column;
      }
    }

    & img {
      width: 100%;
      height: auto;
    }

    & .introduction-screenshot {
      --screen-width: 310px;
      width: calc(var(--screen-width) + var(--base-gap) / 3 * 2);
      flex: 0 0 auto;
      position: relative;
      text-align: center;

      @media (--medium-viewport) {
        order: 2;
        margin:
          0
          auto
          calc(-8 * var(--base-gap))
          auto;
      }

      & .device {
        box-shadow: 0 5px 11px rgba(0, 0, 0, 0.6);
        position: absolute;
        width: 100%;

        @media (--medium-viewport) {
          position: relative;
        }
      }

      & .device-screen {
        height: calc(var(--screen-width) / 100 * 177.77);
        overflow: hidden;
      }

      & picture {
        position: absolute;
        overflow: hidden;
      }
    }

    & .introduction-content {
      padding-left: calc(var(--base-gap) * 2);
      font-weight: 500;

      @media (--medium-viewport) {
        order: 1;
        padding-left: 0;
        margin-bottom: calc(var(--base-gap) * 2);
        text-align: center;
      }

      & h1 {
        margin: 0 0 var(--base-gap);
        text-align: left;

        @media (--medium-viewport) {
          text-align: center;
        }
      }

      & a {
        display: inline-flex;
        margin-top: calc(2 * var(--base-gap));
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
        text-shadow: none;
      }

      & ul {
        margin-top: var(--base-gap);
        list-style: none;
      }

      & ul li {
        font-style: italic;
        display: flex;
        align-items: center;
        line-height: 200%;

        @media (--medium-viewport) {
          justify-content: center;
        }
      }

      & ul li svg {
        margin-right: calc(var(--base-gap) / 2);
      }

      & ul li p,
      & ul li svg {
        cursor: help;
      }
    }

    & .introduction-disclaimer {
      margin-top: var(--base-gap);
      display: block;
      font-size: var(--text-size-xsmall);
      font-style: italic;
      color: var(--transparency-black-medium);
      text-shadow: none;
    }
  }

  .page-section.section-what {
    text-align: center;

    & h1 {
      margin: calc(6 * var(--base-gap)) 0;
      color: var(--brand-green);
      text-shadow: 0 3px 10px var(--brand-green-lighten);
    }
  }

  .page-section.section-features {
    & h1 {
      margin-bottom: calc(6 * var(--base-gap));
    }

    & .features-list-item {
      margin-bottom: calc(8 * var(--base-gap));
      display: flex;
      justify-content: space-evenly;

      &:nth-of-type(even) {
        flex-direction: row-reverse;
      }

      @media (--medium-viewport) {
        flex-direction: column;
        text-align: center;

        &:nth-of-type(even) {
          flex-direction: column;
        }
      }
    }

    & .features-list-preview {
      position: relative;
      width: 60%;

      &::after,
      &::before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        width: calc(100% + var(--base-gap));
        height: calc(100% + var(--base-gap));
        transform:
          translate(
            calc(-1 * var(--base-gap) / 2),
            calc(-1 * var(--base-gap) / 2)
          );
        border-radius: 50%;
        background: var(--grey);
      }

      &::before {
        display: none;
      }
    }

    & .feature-modules .features-list-preview {
      @media (--medium-viewport) {
        order: 2;
        width: 100%;
        height: 20vh;
        text-align: left;

        & .plant-component .component-content {
          font-size: 80%;
          line-height: 1.5;
        }
      }

      &::after,
      &::before {
        width: calc(100% - 2 * var(--base-gap));
        height: calc(100% - var(--base-gap));
        border-radius: var(--border-radius);
        bottom: 0;
        left: 0;
        transform:
          translateY(20%)
          translateX(var(--base-gap));
      }

      &::before {
        opacity: 0.5;
        display: block;
        width: calc(100% - 4 * var(--base-gap));
        transform:
          translateY(30%)
          translateX(calc(2 * var(--base-gap)));
      }

      & > div {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;

        &.selected {
          opacity: 1;
          z-index: 2;
        }
      }
    }

    & .feature-modules .features-list-description {
      @media (--medium-viewport) {
        order: 1;
      }

      & p {
        margin: var(--base-gap) 0;
      }
    }

    & .features-modules-selection {
      display: flex;
      list-style: none;
      margin-top: calc(var(--base-gap) * 1.5);

      @media (--medium-viewport) {
        justify-content: center;
        margin-bottom: calc(var(--base-gap) * 1.5);
      }

      & li:not(:last-child) {
        margin-right: calc(var(--base-gap) / 2);
      }
    }

    & .feature-gallery .features-list-description {
      flex: 0 1 60%;
      margin-left: var(--base-gap);
      justify-content: center;
      display: flex;
      flex-direction: column;

      & h2 {
        margin-bottom: var(--base-gap);
      }
    }

    & .feature-gallery .features-list-preview {
      width: 40%;

      @media (--medium-viewport) {
        margin-top: calc(2 * var(--base-gap));
        width: 100%;
      }

      &::after {
        display: none;
      }

      & svg {
        opacity: 0.2;
      }
    }

    & .feature-gallery .gallery-wrapper {
      display: flex;
      width: 100%;
      height: 350px;
      align-content: center;
      flex-wrap: wrap;
      margin: 0 auto;
      overflow: hidden;
      position: relative;

      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: calc(2 * var(--base-gap));
        background: linear-gradient(180deg, white, transparent);
        left: 0;
        right: 0;
      }

      &::before {
        top: 0;
        background: linear-gradient(180deg, white, transparent);
      }

      &::after {
        bottom: 0;
        background: linear-gradient(0deg, white, transparent);
      }

      & ul {
        width: 100%;
        list-style: none;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }

      & li {
        --preview-size: 120px;
        width: var(--preview-size);
        height: var(--preview-size);

        &:nth-child(odd) {
          margin-right: calc(var(--base-gap) / 2);
        }

        &:not(:last-child):not(:nth-last-of-type(2)) {
          margin-bottom: calc(var(--base-gap) / 2);
        }
      }

      & .box {
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--light-grey);
      }
    }

    & .features-cloud .device img {
      width: 100%;
    }

    & .features-cloud .device-phone {
      width: 300px;
    }

    & .features-cloud .device-laptop {
      width: 300px;
    }

    & .features-roadmap {
      margin-bottom: calc(2 * var(--base-gap));
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      & a {
        margin-top: var(--base-gap);
      }
    }
  }

  .section-faq {
    background: var(--brand-blue);
    color: white;

    & h1 {
      margin-bottom: calc(4 * var(--base-gap));
    }

    & .faq-list {
      list-style: none;

      & li:not(:last-child) {
        margin-bottom: calc(2 * var(--base-gap));
      }
    }
  }
</style>