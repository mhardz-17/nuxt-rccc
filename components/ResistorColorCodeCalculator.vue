<template>
    <div class="rcc-calculator container">
        <h1>{{ msg }}</h1>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" @click="setBandCount(4)">
                <a class="nav-link active" id="r4-tab-link" data-toggle="tab" href="#r4-tab" role="tab"
                   aria-controls="home" aria-selected="true">4 Band</a>
            </li>
            <li class="nav-item" @click="setBandCount(5)">
                <a class="nav-link" id="r5-tab-link" data-toggle="tab" href="#r5-tab" role="tab" aria-controls="profile"
                   aria-selected="false">5 Band</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane show active" id="r4-tab" role="tabpanel" aria-labelledby="home-tab">
                <h5>4 Band Resistor</h5>
                <div class="row justify-content-md-center">
                    <div class="" style="background-color:#17a2b8; height: 50px;width: 150px;padding-left: 15px;">
                        <div class="band" :class="[r4b1]"></div>
                        <div class="band" :class="[r4b2]"></div>
                        <div class="band" :class="[r4b3]"></div>
                        <div class="band" :class="[r4b4]"></div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col">
                        First Band <br>
                        <base-band name="r4b1" v-bind:value="r4b1" @update="cc"></base-band>
                    </div>
                    <div class="col">
                        Second band <br>
                        <base-band name="r4b2" v-bind:value="r4b2" @update="cc"></base-band>
                    </div>
                    <div class="col">
                        Third Band (Mul.)
                        <multiplier-band name="r4b3" v-bind:value="r4b3" @update="cc"></multiplier-band>
                    </div>
                    <div class="col">
                        Fourth Band(Tol.)
                        <tolerance-band name="r4b4" v-bind:value="r4b4" @update="cc"></tolerance-band>
                    </div>
                </div>
                <hr>
                Resistance: {{ formatResistance(resistance) }} <br>
                Min Resistance: {{ formatResistance(min_resistance) }} <br>
                Max Resistance: {{ formatResistance(max_resistance) }} <br>
            </div>
            <div class="tab-pane" id="r5-tab" role="tabpanel" aria-labelledby="r5-tab">
                <h5>5 Band Resistor</h5>
                <div class="row justify-content-md-center">
                    <div class="" style="background-color:#17a2b8; height: 50px;width: 180px;padding-left: 15px;">
                        <div class="band" :class="[r5b1]"></div>
                        <div class="band" :class="[r5b2]"></div>
                        <div class="band" :class="[r5b3]"></div>
                        <div class="band" :class="[r5b4]"></div>
                        <div class="band" :class="[r5b5]"></div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col">
                        First Band <br>
                        <base-band name="r5b1" v-bind:value="r5b1" @update="cc"></base-band>
                    </div>
                    <div class="col">
                        Second Band <br>
                        <base-band name="r5b2" v-bind:value="r5b2" @update="cc"></base-band>
                    </div>
                    <div class="col">
                        Third Band <br>
                        <base-band name="r5b3" v-bind:value="r5b3" @update="cc"></base-band>
                    </div>
                    <div class="col">
                        Fourth Band(Mul.) <br>
                        <multiplier-band name="r5b4" v-bind:value="r5b4" @update="cc"></multiplier-band>
                    </div>
                    <div class="col">
                        Fifth Band(Tol.) <br>
                        <tolerance-band name="r5b5" v-bind:value="r5b5" @update="cc"></tolerance-band>
                    </div>
                </div>
                <hr>
                Resistance: {{ formatResistance(resistance) }} <br>
                Min Resistance: {{ formatResistance(min_resistance) }} <br>
                Max Resistance: {{ formatResistance(max_resistance) }} <br>
            </div>
        </div>
    </div>
</template>

<script>
import BaseBand from "./BaseBand";
import MultiplierBand from "./MultiplierBand";
import ToleranceBand from "./ToleranceBand";

const baseValue = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    purple: 7,
    gray: 8,
    white: 9
  },
  mutilplierValue = {
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
  }, toleranceValue = {
    brown: '± 1%',
    red: '± 2%',
    gold: '± 5%',
    silver: '± 10%'
  }

export default {
  name: 'ResistorColorCodeCalculator',
    components: {ToleranceBand, MultiplierBand, BaseBand},
    data () {
    return {
      msg: 'This app is used to calculate resistance of color coded band resistor.',
      r4b1: 'white',
      r4b2: 'blue',
      r4b3: 'silver',
      r4b4: 'gold',
      r5b1: 'white',
      r5b2: 'blue',
      r5b3: 'black',
      r5b4: 'silver',
      r5b5: 'gold',
      bandCount: 4,
      resistance: 0,
      min_resistance: 0,
      max_resistance: 0
    }
  },
  created () {
    this.getResistance()
  },
  computed: {
    getClassFor: function (key) {
      var a = {}
      a[key] = true
      return a
    }

  },
  methods: {
    setBandCount: function (band) {
      this.bandCount = band
      this.getResistance()
    },
    cc: function (key, value) {
      this[key] = value
      this.getResistance()
    },
    computeResistance: function (bandColors) {
      var base = String(bandColors.b1) + String(bandColors.b2)
      if (bandColors.hasOwnProperty('b3')) {
        base + String(bandColors.b3)
      }
      var multiplier = bandColors.m
      multiplier = multiplier.replace('x', '').replace('k', '000').replace('M', '000000').replace('G', '000000000')
      this.resistance = parseFloat(base) * parseFloat(multiplier)

      var tolerance = bandColors.t
      tolerance = parseFloat(tolerance.replace('± ', '').replace('%', ''))
      if (!tolerance) {
        tolerance = 20
      }

      let plusminus_resistance = parseFloat(this.resistance * (tolerance / 100))
      this.min_resistance = this.resistance - plusminus_resistance
      this.max_resistance = this.resistance + plusminus_resistance
    },
    formatResistance: function (resistance) {
      if (resistance < 1000) {
        return resistance
      }

      if (parseInt((resistance / 1000000000)) >= 1) {
        return (resistance / 1000000000) + 'G'
      }
      if (parseInt((resistance / 1000000)) >= 1) {
        return (resistance / 1000000) + 'M'
      }

      if (parseInt((resistance / 1000)) >= 1) {
        return (resistance / 1000) + 'K'
      }

      return resistance
    },
    getResistance: function () {
      if (this.bandCount == 4) {
        return this.computeResistance({
          b1: baseValue[this.r4b1],
          b2: baseValue[this.r4b2],
          m: mutilplierValue[this.r4b3],
          t: toleranceValue[this.r4b4]
        })
      }

      if (this.bandCount == 5) {
        return this.computeResistance({
          b1: baseValue[this.r5b1],
          b2: baseValue[this.r5b2],
          b3: baseValue[this.r5b3],
          m: mutilplierValue[this.r5b4],
          t: toleranceValue[this.r5b5]
        })
      }
    }
  }
}
</script>
