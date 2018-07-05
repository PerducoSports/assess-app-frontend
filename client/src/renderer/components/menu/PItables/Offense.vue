<template>
    <v-data-table
      :headers="headers"
      :items="offense"
      hide-actions
      class="elevation-2"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.position }}</td>
        <td class="text-xs">{{ props.item.number }}</td>
        <td class="text-xs">{{ props.item.name }}</td>
      </template>
    </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      trackingData: 'trackingData',
      currentPage: 'currentPage'
    })
  },
  data () {
    return {
      headers: [
        {
          text: 'Pos',
          align: 'center',
          value: 'position'
        },
        { text: '#', value: 'number', align: 'center' },
        { text: 'Name', value: 'name', align: 'center' }
      ],
      offense: [{
        position: 'QB',
        number: '00',
        name: 'Default QB'
      }]
    }
  },
  methods: {
    setPlayers () {
      let posit = ''
      for (let i = 0; i < this.trackingData.mPlayerRoles.offense.length; i++) {
        if (this.trackingData.mPlayerRoles.offense[i].playPos !== 'QB') {
          // determine position
          if (['X', 'Y', 'Z', 'F', 'H'].includes(this.trackingData.mPlayerRoles.offense[i].playPos)) {
            posit = this.trackingData.pffpos[this.trackingData.mPlayerRoles.offense[i].playPos].pff
          } else {
            posit = this.trackingData.mPlayerRoles.offense[i].playPos
          }
          this.offense.push({
            position: posit,
            number: 0,
            // number: this.trackingData.mTeamRoster.offense[i].jersey,
            name: 'Default Player ' + i.toString()
            // name: this.trackingData.mTeamRoster.offense[i].firstName + ' ' + this.trackingData.mTeamRoster.offense[i].lastName
          })
        }
      }
    }
  },
  mounted () {
    this.setPlayers()
  }
}
</script>
