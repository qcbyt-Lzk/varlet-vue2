<template>
  <div
    class="var-tab var--box"
    ref="tabEl"
    v-ripple="{ disabled }"
    :class="[computeColorClass(), `var-tab--${itemDirection}`]"
    :style="{
      color: computeColorStyle(),
    }"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script>
import Ripple from '../ripple'
import { defineComponent } from '../utils/create'
import { props } from './props'
import { createChildrenMixin } from '../utils/mixins/relation'

export default defineComponent({
  name: 'VarTab',

  mixins: [createChildrenMixin('tab', { parentKey: 'tab', childrenKey: 'tabs' })],

  directives: { Ripple },

  props,

  computed: {
    element() {
      return this.$refs.tabEl
    },

    itemDirection() {
      return this.tab.itemDirection
    },
  },

  watch: {
    name() {
      this.tab.resize()
    },

    disabled() {
      this.tab.resize()
    },
  },

  methods: {
    computeColorStyle() {
      const { disabled, name, tab, index } = this
      const { active, activeColor, inactiveColor, disabledColor } = tab

      return disabled ? disabledColor : active === name || active === index ? activeColor : inactiveColor
    },

    computeColorClass() {
      const {
        disabled,
        name,
        index,
        tab: { active },
      } = this

      return disabled
        ? 'var-tab--disabled'
        : active === name || active === index
        ? 'var-tab--active'
        : 'var-tab--inactive'
    },

    handleClick(event) {
      const {
        disabled,
        name,
        getListeners,
        index,
        element,
        tab: { onTabClick },
      } = this

      if (disabled) {
        return
      }

      getListeners().onClick?.(name ?? index, event)
      onTabClick({
        name,
        index,
        disabled,
        element,
      })
    },
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../ripple/ripple';
@import './tab';
</style>
