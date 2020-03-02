<template>
  <div :class="['device', `device-${type}`]">
    <div class="device-windowbar">
      <div />
      <div />
      <div />
    </div>

    <div class="device-screen">
      <slot />
    </div>
  </div>
</template>


<script>
  const devices = ['phone', 'laptop']
  export default {
    name: 'Device',

    props: {
      type: { type: String, default: 'phone', validator: v => devices.includes(v) }
    }
  }
</script>

<style lang="postcss" scoped>
  .device {
    --device-radius: 20px;
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    overflow: hidden;
    border-radius: var(--device-radius);
  }

  .device-screen {
    position: relative;
  }

  .device-phone {
    padding: 0 calc(var(--base-gap) / 3) 40px;
    background: var(--custom-black);

    & .device-windowbar {
      border-top-right-radius: var(--border-radius);
      border-top-left-radius: var(--border-radius);
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      padding: 7px 10px;

      & > div {
        --control-background: var(--dark-grey);
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background: var(--control-background);

        &:nth-of-type(2) {
          --control-background: black;
          width: 100px;
          margin: 0 var(--base-gap);
          border-radius: var(--border-radius);
        }

        &:nth-of-type(3) {
          width: 4px;
          height: 4px;
        }
      }
    }
  }

  .device-laptop {
    --device-radius: var(--border-radius);
    background: var(--dark-grey);
    padding: calc(var(--base-gap) / 4);

    & .device-screen {
      overflow: hidden;
      border-bottom-right-radius: var(--device-radius);
      border-bottom-left-radius: var(--device-radius);
    }

    & .device-windowbar {
      height: 40px;
      background: transparent;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      & > div {
        --control-background: var(--custom-black);
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background: var(--control-background);

        &:nth-of-type(2) {
          margin: 0 calc(var(--base-gap) / 2);
        }
      }
    }
  }
</style>
