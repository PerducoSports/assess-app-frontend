<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="play"
      hide-actions
      class="elevation-2"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.offDetail }}</td>
        <td class="text-xs-left">{{ props.item.offVal }}</td>
        <td>{{ props.item.defDetail }}</td>
        <td class="text-xs-left">{{ props.item.defVal }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      trackingData: 'trackingData',
      currentPage: 'currentPage',
      routeData: 'routeData'
    })
  },
  data () {
    return {
      headers: [
        {
          text: 'Off Detail',
          align: 'center',
          sortable: false,
          value: 'detail'
        },
        { text: 'Off Value', value: 'val', sortable: false, align: 'left' },
        {
          text: 'Def Detail',
          align: 'center',
          sortable: false,
          value: 'detail'
        },
        { text: 'Def Value', value: 'val', sortable: false, align: 'center' }
      ],
      play: [
        {
          offDetail: 'Formation',
          offVal: null,
          defDetail: 'Play',
          defVal: null
        },
        {
          offDetail: 'Play',
          offVal: null,
          defDetail: 'Defensive Personnel',
          defVal: null
        },
        {
          offDetail: 'Play Type',
          offVal: null,
          defDetail: 'Defensive Basic',
          defVal: null
        },
        {
          offDetail: 'Offensive Personnel',
          offVal: null
        },
        {
          offDetail: 'Offensive Basic',
          offVal: null
        }
      ]
    }
  },
  methods: {
    fill () {
      this.play[0].offVal = this.trackingData.mPlaySituation.offPlayCall.formation.name
      this.play[1].offVal = this.trackingData.mPlaySituation.offPlayCall.play.name
      this.play[2].offVal = this.trackingData.mPlayResult.playType
      this.play[3].offVal = this.trackingData.mPlaySituation.offplaycall.personnel.name
      this.play[4].offVal = this.routeData.OffensiveBasic

      this.play[0].defVal = this.trackingData.mPlaySituation.defPlayCall.play.name
      this.play[1].defVal = this.trackingData.mPlaySituation.defPlayCall.personnel.name
      this.play[2].defVal = this.routeData.DefensiveBasic
    }
  },
  mounted () {
    this.fill()
  }
}
</script>
