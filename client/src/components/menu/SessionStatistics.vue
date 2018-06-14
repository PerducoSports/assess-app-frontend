<template>
<v-container mt-0 pt-0>
  <h1 class="page-title">SESSION STATISTICS</h1>
  <v-layout offset-xs3>
    <v-flex pa-3 xs-9>
      <h1  v-if="sessionStats === null" pt-5>Computing Session Stats</h1>
      <v-progress-linear  v-if="sessionStats === null" :indeterminate="true"></v-progress-linear>
    </v-flex>
  </v-layout>
  <v-layout v-if="sessionStats !== null" row wrap>
    <v-flex pa-3 xs-3>
      <h2 v-if="sessionStats !== null">Overall</h2>
      <Overall v-if="sessionStats !== null"/>
    </v-flex>
    <v-flex pa-3 xs-3>
      <h2 v-if="sessionStats !== null">Zone Summary</h2>
      <ZoneSummary v-if="sessionStats !== null"/>
    </v-flex>
    </v-layout>
    <v-layout>
    <v-flex pa-3 xs-3>
      <h2 v-if="sessionStats !== null">By Route</h2>
      <ByRoute v-if="sessionStats !== null"/>
    </v-flex>
     <v-flex pa-3 xs-3>
      <h2 v-if="sessionStats !== null">Target Summary</h2>
      <TargetSummary v-if="sessionStats !== null"/>
    </v-flex>
  </v-layout>
</v-container>

</template>

<script>
import {mapGetters} from 'vuex'
import ByRoute from './SSTables/ByRoute.vue'
import ByZone from './SSTables/ByZone.vue'
import ZoneSummary from './SSTables/ZoneSummary.vue'
import TargetSummary from './SSTables/TargetSummary.vue'
import Overall from './SSTables/Overall.vue'

export default {
  data () {
    return {
      zoneImg: null,
      targetImg: null,
      show: false
    }
  },
  components: {
    'ByRoute': ByRoute,
    'ByZone': ByZone,
    'Overall': Overall,
    'ZoneSummary': ZoneSummary,
    'TargetSummary': TargetSummary
  },
  computed: {
    ...mapGetters({
      sessionStats: 'sessionStats'
    })
  },
  watch: {
    // sessionStats: {
    //   handler (val) {
    //     if (val !== null) {
    //       this.fill()
    //     }
    //   },
    //   deep: true
    // }
  },
  methods: {
    // fill () {
    //   this.zoneImg = this.sessionStats.zoneimage
    //   this.targetImg = this.sessionStats.targetimage
    // }
  },
  mounted () {
    // TEST
  }
}
</script>

<style scoped>
  #h1 {
    background-color: blue
  }
</style>
