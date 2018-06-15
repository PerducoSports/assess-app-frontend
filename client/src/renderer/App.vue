<template>
<div id="app">
  <v-app>
    <Menu id="menu"></Menu>
    <!-- checks if show is equal to true then based on currentPage, chooses page to display -->
      <FieldDisplay v-if="show & currentPage === 'playAnimation'"/>
      <PlayInformation v-if="show & currentPage === 'playInformation'"/>
      <QBPerformance v-if="show & currentPage === 'QBPerformance'"/>
      <SessionStatistics v-if="show & currentPage === 'SessionStatistics'"/>
      <Splash v-if="trackingData === false"/>
  </v-app>
</div>
</template>

<script>
// import necessary components
import FieldDisplay from '@/components/FieldDisplay.vue'
import Menu from '@/components/menu/Menu.vue'
import PlayInformation from '@/components/menu/PlayInformation.vue'
import QBPerformance from '@/components/menu/QBPerformance.vue'
import SessionStatistics from '@/components/menu/SessionStatistics.vue'
import Splash from '@/components/Splash.vue'

// imports getters from store, this happens on almost every page
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      show: true
    }
  },
  watch: {
    trackingData: {
      // this refreshes the page if a new play is chosen
      handler (val) {
        // declaring self as this fixes problems with scope when this is nested
        var self = this
        self.show = false
        this.$nextTick(function () {
          self.show = true
        })
      }
    }
  },
  // when using components within a page, this is where and how they are declared
  components: {
    'FieldDisplay': FieldDisplay,
    'Menu': Menu,
    'PlayInformation': PlayInformation,
    'QBPerformance': QBPerformance,
    'SessionStatistics': SessionStatistics,
    'Splash': Splash
  },
  // this is where the getters are accessed
  computed: {
    ...mapGetters({
      sliderTime: 'sliderTime',
      btnState: 'btnState',
      trackingData: 'trackingData',
      maxTime: 'maxTime',
      currentPage: 'currentPage'
    })
  },
  // this is how you declare the functions you would use. you call them with 'this'
  methods: {
  }
}
</script>


<style>
#menu {
  position: absolute;
  top: 10px;
  z-index: 1000000;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0px;
  background-color: whitesmoke;
  color: #2c3e50;
}

div.cotainer.fluid {
  padding: 0px;
}

h1.page-title {
  color: white;
  background-color:#2c3e50;
  border-radius:0px 0px 10px 10px;
  margin:0 200px;
}
</style>

