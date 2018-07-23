<template>
    <div class="baseband">
        <select class="form-control baseband-selector" v-bind:class="selectClass" v-model="currentValue" @change="updateParent" >
            <option  v-for="(value,color) in color_and_values" v-bind:key="color" :value="color">{{ getLabel(value, color) }}</option>
        </select>
    </div>
</template>

<script>

const colorAndValue = {
  black: 'x1',
  brown: 'x10',
  red: 'x100',
  orange: 'x1k',
  yellow: 'x10k',
  green: 'x100k',
  blue: 'x1M',
  purple: 'x10M',
  gray: 'x100M',
  white: 'x1G',
  gold: 'x.1',
  silver: 'x.01'
}

export default {
  name: 'MultiplierBand',
  data () {
    return {
      color_and_values: colorAndValue,
      currentValue: this.value,
      parent_key: this.name
    }
  },
  props: ['value', 'name'],
  computed: {
    selectClass: function () {
      let classes = {}
      let self = this
      _.forEach(colorAndValue, function (value, key) {
        classes[key] = (key == self.currentValue)
      })
      return classes
    }
  },
  methods: {
    updateParent: function () {
      console.log(this.parent_key + ': ' + this.currentValue)
      this.$emit('update', this.parent_key, this.currentValue)
    },
    getLabel: function (value, color) {
      return value + ' ' + _.capitalize(color)
    }
  }
}
</script>
