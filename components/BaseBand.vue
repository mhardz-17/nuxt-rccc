<template>
    <div class="baseband">
        <select class="form-control baseband-selector" v-bind:class="selectClass" v-model="currentValue" @change="updateParent" >
            <option  v-for="(data,key) in color_and_values" v-bind:key="key" :value="key">{{ data.label }}</option>
        </select>
    </div>
</template>

<script>
const colorAndValue = {
  black: {value: 0, label: '0 Black'},
  brown: {value: 1, label: '1 Brown'},
  red: {value: 2, label: '2 Red'},
  orange: {value: 3, label: '3 Orange'},
  yellow: {value: 4, label: '4 Yellow'},
  green: {value: 5, label: '5 Green'},
  blue: {value: 6, label: '6 Blue'},
  purple: {value: 7, label: '7 Purple'},
  gray: {value: 8, label: '8 Gray'},
  white: {value: 9, label: '9 White'}
}

export default {
  name: 'BaseBand',
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
      this.$emit('update', this.parent_key, this.currentValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
