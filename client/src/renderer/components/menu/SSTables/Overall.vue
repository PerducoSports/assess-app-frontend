<template>
    <v-data-table :headers="headers" :items="stats" hide-actions class="elevation-2">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.statistic }}</td>
        <td class="text-xs-left">{{ props.item.val }}</td>

      </template>
    </v-data-table>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Statistic',
          align: 'center',
          sortable: false,
          value: 'statistic'
        },
        { text: 'Value', value: 'val', sortable: false, align: 'left' }
      ],
      stats: [
        {statistic: 'Completion Percentage', val: null},
        {statistic: 'Yards Per Attempt', val: null},
        {statistic: 'Avg. Air Yards', val: null},
        {statistic: 'Avg. Air Distance', val: null},
        {statistic: 'Avg. Time To Throw', val: null},
        {statistic: 'Sacks', val: null},
        {statistic: 'Intentional Grounding', val: null},
        {statistic: 'Thrown Away', val: null}
      ]
    }
  },
  computed: {
    ...mapGetters({
      trackingData: 'trackingData',
      sessionStats: 'sessionStats'
    })
  },
  methods: {
    fill () {
      this.stats[0].val = (100 * this.sessionStats.completionpct).toFixed(1) + ' %'
      this.stats[1].val = this.sessionStats.yardsperattempt.toFixed(1) + ' yds'
      this.stats[2].val = this.sessionStats.avgairyards.toFixed(1) + ' yds'
      this.stats[3].val = this.sessionStats.avgairdistance.toFixed(1) + ' yds'
      this.stats[4].val = this.sessionStats.avgtimetothrow.toFixed(1) + ' sec'
      this.stats[5].val = this.sessionStats.sacks
      this.stats[6].val = this.sessionStats.intentionalgrounding
      this.stats[7].val = this.sessionStats.thrownaway
    }
  },
  mounted () {
    this.fill()
  }
}
</script>
