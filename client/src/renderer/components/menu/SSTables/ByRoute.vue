<template>
<v-data-table :headers="headers" :items="routes" hide-actions class="elevation-2">
    <template slot="items" slot-scope="props">
      <tr @click='props.item.clicked = !props.item.clicked' dark :active="props.item.clicked">
      <td>{{ props.item.rte }}</td>
      <td class="text-xs-left">{{ props.item.name }}</td>
      <td class="text-xs-center">{{ props.item.run }}</td>
      <td class="text-xs-center">{{ props.item.targeted }}</td>
      <td class="text-xs-center">{{ props.item.complete }}</td>
      <td class="text-xs-center">{{ props.item.td }}</td>
      <td class="text-xs-center">{{ props.item.yds }}</td>
      </tr>
    </template>
</v-data-table>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      headers: [
        { text: 'Route', align: 'left', sortable: false, value: 'rte' },
        { text: 'Name', value: 'name', sortable: false, align: 'left' },
        { text: 'Run', value: 'run', sortable: false, align: 'center' },
        { text: 'Targeted', value: 'targeted', sortable: false, align: 'center' },
        { text: 'Complete', value: 'complete', sortable: false, align: 'center' },
        { text: 'TD', value: 'td', sortable: false, align: 'center' },
        { text: 'Yards', value: 'yds', sortable: false, align: 'center' }
      ],
      routes: [
        {
          rte: 1,
          name: 'Quick Out',
          run: 2,
          targeted: 1,
          complete: 1,
          td: 1,
          yds: 3
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      trackingData: 'trackingData',
      sessionStats: 'sessionStats',
      chosenRow: 'routeColors'
    })
  },
  watch: {
    routes: {
      handler (val) {
        let activeRoutes = []
        for (let i of val) {
          if (i.clicked === true) {
            activeRoutes.push(i.name)
          }
        }
        this.$store.commit('setClickedRoutes', activeRoutes)
      },
      deep: true
    }
  },
  methods: {
    fill () {
      let routeVals = []
      for (let i = 1; i < this.sessionStats['Route Data'].length; i++) {
        routeVals.push(
          {
            rte: i,
            name: this.sessionStats['Route Data'][i][0],
            run: this.sessionStats['Route Data'][i][1],
            targeted: this.sessionStats['Route Data'][i][2],
            complete: this.sessionStats['Route Data'][i][3],
            td: this.sessionStats['Route Data'][i][4],
            yds: this.sessionStats['Route Data'][i][5],
            highlighted: false,
            clicked: true
          })
      }
      this.routes = routeVals
    }
  },
  mounted () {
    this.fill()
  }
}
</script>
<style scoped>
.application .theme--light.table tbody tr[active], .theme--light .table tbody tr[active] {
  background-color: #2c3e50;
  color: white;
}
</style>
