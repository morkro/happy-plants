<template>
  <footer id="app-footer" role="contentinfo">
    <wave-border color="black" />

    <div class="app-footer-inner">
      <div class="app-footer-contact">
        <v-text variant="subline">
          Having a question or a problem?<br>Don't hesitate to reach out!
        </v-text>

        <div class="app-footer-contact-btn">
          <div>
            <v-text>{{ email }}</v-text>

            <ul class="app-footer-contact-actions">
              <li>
                <v-button
                  color="transparent"
                  @click.native="onCopyEmail"
                >
                  Copy
                </v-button>  
              </li>
              <li>
                <v-button
                  tag="a"
                  color="transparent"
                  :href="`mailto:${email}`"
                >
                  Open
                </v-button>  
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <div class="app-footer-inner">
      <div class="app-footer-left">     
        <div class="app-footer-author">
          <div>
            <v-box class="app-footer-author-photo">
              <lazy-image
                :source="require('~/assets/moritz.jpg')"
                alt="Photo of Moritz Kröger"
              />
            </v-box>

            <ul class="app-footer-author-social">
              <li v-for="profile in socialMedia" :key="profile.icon">
                <a
                  :href="profile.link"
                  target="_blank"
                  rel="noopener"
                  :aria-label="profile.label"
                >
                  <component :is="`feather-${profile.icon}`" />
                </a>
              </li>
            </ul>
          </div>

          <v-typography>
            My name is Moritz Kröger, I'm an open source engineer and plant enthusiast from 
            <a
              href="https://goo.gl/maps/cateuodz7YfQAGVYA"
              rel="noopener"
              target="_blank"
            >Berlin</a>.
            I created HappyPlants as an easy and visual way of documenting my houseplants.
          </v-typography>
        </div>
      </div>

      <div class="app-footer-right">
        <ul>
          <li v-for="link in links" :key="link.label">
            <a
              :href="link.link"
              target="_blank"
              rel="noopener"
            >
              <component :is="`feather-${link.icon}`" />
              {{link.label}}
            </a>
          </li>
        </ul>
        <v-text>
          © {{ currentYear }} HappyPlants
        </v-text>
      </div>
    </div>
  </footer>
</template>

<script>
  import {
    TwitterIcon,
    MapIcon,
    AlertCircleIcon,
    GithubIcon,
    InstagramIcon,
    HomeIcon
  } from 'vue-feather-icons'
  import Button from '~/components/Button'
  import Typography from '~/components/Typography'

  export default {
    components: {
      'v-button': Button,
      'v-text': Typography,
      'feather-twitter': TwitterIcon,
      'feather-map': MapIcon,
      'feather-alert': AlertCircleIcon,
      'feather-github': GithubIcon,
      'feather-instagram': InstagramIcon,
      'feather-home': HomeIcon,
    },

    data: () => ({
      email: 'happyplants@moritz.berlin',
      currentYear: new Date().getFullYear(),
      socialMedia: [
        {
          link: 'https://www.instagram.com/morkro',
          label: 'Link to Instagram',
          icon: 'instagram'
        },
        {
          link: 'https://www.moritz.berlin',
          label: 'Personal website',
          icon: 'home'
        },
        {
          link: 'https://www.github.com/morkro',
          label: 'Link to GitHub',
          icon: 'github'
        }
      ],
      links: [
        {
          link: 'https://twitter.com/morkro',
          label: 'Follow for updates',
          icon: 'twitter'
        },
        {
          link: 'https://github.com/morkro/happy-plants/projects/5',
          label: 'Roadmap',
          icon: 'map'
        },
        {
          link: 'https://github.com/morkro/happy-plants/issues',
          label: 'Bug reporting',
          icon: 'alert'
        },
        {
          link: 'https://github.com/morkro/happy-plants-landing',
          label: 'View source',
          icon: 'github'
        }
      ]
    }),

    methods: {
      onCopyEmail () {
        /* Workaround for Safari */
        const range = document.createRange()
        range.selectNodeContents(document.body)
        document.getSelection().addRange(range)
        
        const copy = event => {
          event.clipboardData.setData('text/plain', this.email)
          event.preventDefault()
        }

        document.addEventListener('copy', copy)
        document.execCommand('copy')
        document.removeEventListener('copy', copy)
        document.getSelection().removeAllRanges()
      }
    }
  }
</script>


<style lang="postcss" scoped>
  @custom-media --small-viewport (max-width: 775px);

  #app-footer {
    width: 100vw;
    background: var(--custom-black);
    color: var(--grey);
    position: relative;

    & a svg {
      filter: none;
    }
  }

  .app-footer-inner {
    --padding-vertical: calc(var(--base-gap) * 6);
    width: 100%;
    max-width: var(--max-page-width);
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding:
      var(--padding-vertical)
      var(--base-gap);

    &:first-of-type {
      border-bottom: 2px solid var(--transparency-white-light);
    }

    @media (--small-viewport) {
      --padding-vertical: calc(var(--base-gap) * 4);
      display: block;
    }
  }

  .app-footer-left {
    width: 60%;

    @media (--small-viewport) {
      width: 100%;
    }
  }

  .app-footer-author {
    display: flex;

    @media (--small-viewport) {
      flex-direction: column;
      margin-bottom: calc(var(--base-gap) * 4);
      text-align: center;
    }

    & > div {
      margin-right: var(--base-gap);

      @media (--small-viewport) {
        margin-right: 0;
      }
    }

    & .app-footer-author-photo {
      width: 150px;
      height: 150px;
      flex: 0 0 auto;
      margin: 0 auto;
    }

    & .typography {
      --size: var(--text-size-small);
    }
  }

  .app-footer-author-social {
    display: flex;
    justify-content: center;
    list-style: none;
    margin-top: var(--base-gap);

    @media (--small-viewport) {
      margin-bottom: var(--base-gap);
    }

    & li {
      margin: 0 calc(var(--base-gap) / 2);
    }

    & a:hover svg {
      stroke: var(--brand-green);
    }

    & svg {
      stroke: var(--custom-white);
    }
  }

  .app-footer-contact {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;

    & .app-footer-contact-btn {
      display: inline-block;
      background: black;
      border-radius: var(--border-radius);
      position: relative;
      margin-top: var(--base-gap);

      & > div {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 0;
      }

      & p {
        margin: 0 calc(2 * var(--base-gap));
      }
    }

    & .app-footer-contact-actions {
      --border: 2px solid var(--custom-black);
      border-left: var(--border);
      list-style: none;

      & li:first-child {
        border-bottom: var(--border);
      }

      & a,
      & button {
        --button-font-size: var(--text-size-xsmall);
      }

      & button span,
      & a span {
        line-height: 100%;
      }
    }
  }

  .app-footer-right {
    text-align: right;
    width: 40%;

    @media (--small-viewport) {
      width: 100%;
      text-align: center;
    }

    &,
    & .typography {
      font-size: var(--text-size-small);
    }

    & ul {
      list-style: none;
      line-height: 170%;
      margin-bottom: var(--base-gap);
    }

    & a {
      color: var(--text-color-inverse);
      display: inline-flex;
      align-items: center;

      & svg {
        width: var(--text-size-base);
        height: var(--text-size-base);
        margin-right: calc(var(--base-gap) / 2);
      }
    }
  }
</style>
