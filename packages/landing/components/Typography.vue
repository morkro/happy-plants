<template>
  <component :is="element" class="typography">
    <slot />  
  </component>  
</template>

<script>
  const variants = [
    'headline',
    'subline',
    'paragraph',
    'sidenote'
  ]
  export default {
    name: 'Typography',

    props: {
      variant: {
        type: String,
        default: 'paragraph',
        validator: v => variants.includes(v)
      } 
    },

    computed: {
      element () {
        switch (this.variant) {
        case 'headline':
          return 'h1'
        case 'subline':
          return 'h2'
        case 'sidenote':
          return 'span'
        case 'paragraph':
        default:
          return 'p'
        }
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .typography {
    --weight: 500;
    --size: var(--text-size-base);
    font-weight: var(--weight);
    font-size: var(--size);

    & a {
      color: inherit;
    }
  }

  h1.typography {
    --size: 220%;
    --weight: 600;
    line-height: calc(var(--size) / 2);
  }

  h2.typography {
    --size: 150%;
    --weight: 600;
    line-height: var(--size);
  }
  
  span.typography {
    --size: var(--text-size-xsmall);
  }
</style>
